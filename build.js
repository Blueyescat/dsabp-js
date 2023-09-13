import { generateDtsBundle } from "dts-bundle-generator"
import { build as esbuild, transform } from "esbuild"
import { readFile, writeFile } from "fs/promises"
import pkg from "./package.json" assert { type: "json" }

const globalName = "dsabp"
const entry = "./src/index.ts"
const outFolder = "./dist/"

/** @type {import("esbuild").BuildOptions} */
const commonOpts = {
	entryPoints: [entry],
	banner: {
		js: `/*! ${pkg.name} v${pkg.version} @license ${pkg.license} ${pkg.homepage} */`
	},
	bundle: true,
	target: "es2022"
}

const excludeFromSrcMap = /fflate/
function getPl(type) {
	if (type == "node") return [{
		replacePlValues: [
			["import.meta.url", "__filename"],
			[/.+\/\/ @build_browser-only.*\n?/g, ""],
			[/(?:[\t ]+)\/\*[\s\S]+?\*\/ ?/g, ""], // multi line comments
		]
	}]
	if (type == "browser") return [
		srcMapExcludePl(excludeFromSrcMap),
		{
			replacePlValues: [
				[/.+\/\/ @build_node-only.*\n?/g, ""],
				[/(?:[\t ]+)\/\*[\s\S]+?\*\/ ?/g, ""]
			]
		}
	]
	if (type == "browser.min") return [
		srcMapExcludePl(excludeFromSrcMap),
		{
			replacePlValues: [
				[/.+\/\/ @build_node-only.*\n?/g, ""]
			]
		}
	]
}

async function build(platform, format, sourcemap, minify) {
	const ext = `${minify ? ".min" : ""}.${platform + format == "nodecjs" ? "c" : ""}js`
	const outfile = `${outFolder}${platform}/${format}/index${ext}`
	console.info(time(), outfile)
	const scriptUrlCode = (platform == "browser" && format != "esm") ? await getScriptUrlCode(ext) : undefined
	await esbuild({
		...commonOpts, outfile,
		platform, format, globalName,
		minify, sourcemap,
		plugins: (platform == "browser" ? (minify ? getPl("browser.min") : getPl("browser")) : getPl("node")).map(o => {
			// merges replace values and runs replacePl only once - something is wrong with multiple plugins using onLoad...
			if (!o.replacePlValues) return o

			o.replacePlValues.unshift(["null // @build_bundleInfo", `{format:"${format}",globalName:"${globalName}"}`])

			if (platform == "browser" && format != "esm") {
				// save scriptUrl at top if the script uses import.meta, then replace import.meta with scriptUrl
				o.replacePlValues.unshift([
					/([\s\S]*import\.meta\.url[\s\S]*)/g,
					scriptUrlCode + "$1"
				], ["import.meta.url", "scriptUrl"])
			}
			return replacePl(...o.replacePlValues)
		})
	})
}

await build("node", "cjs", true)
await build("browser", "esm", true)
await build("browser", "esm", true, true)
await build("browser", "iife", true)
await build("browser", "iife", true, true)

await readFile("./README.md", "utf8").then(async contents => {
	await writeFile("./README.md", contents.replace(
		/[^\s]+(?=<!--@build_tarball-->)/g,
		`https://registry.npmjs.org/${pkg.name}/-/${pkg.name}-${pkg.version}.tgz`
	))
})

console.info(`${time()} ${outFolder}index.d.ts`)
await writeFile(`${outFolder}index.d.ts`, generateDtsBundle([{
	filePath: entry,
	output: {
		umdModuleName: globalName,
		noBanner: true
	}
}])[0])
console.info(time(), "finished")

//

async function getScriptUrlCode(ext) {
	ext = ext.replaceAll(".", "\\.")
	return (await transform(
		(() => { /* eslint-disable */
			var scriptUrl = globalThis.document?.currentScript?.src
				??
				(globalThis.window && (window.chrome ?? window.browser)?.runtime
					// browser extensions can load the ESM bundle as a module in some ways and the import.meta.url will work fine
					// but if it is IIFE and loaded using manifest (not with script element), document.currentScript will be null
					// so we need to find the absolute path to the content script from the manifest
					// scripting.registerContentScripts needs to be handled differently but that's pointless
					? ((regexPath = REGEX, b = window.chrome ?? window.browser) => {
						let urlPatternToRegEx = p => new RegExp("^"
							+ p.replaceAll("/", "\\/").replaceAll(".", "\\.") // escape . and /
								.replaceAll("*:\\/\\/", "https?:\\/\\/") // *:// -> https?
								.replaceAll("*\\.", ".*\\.") // *. -> .*\.
								.replaceAll("\\.*", "\\..*") // \.* -> \..*
								.replaceAll("\\/*", "\\/.*") // /* -> /.*
								.replace(/(?<![\/.])\*(?!\.)/g, ".*") // abc*abc -> abc.*abc, no . or / near *
							+ "$")
						for (let cs of b.runtime.getManifest().content_scripts)
							for (let match of cs.matches)
								if (urlPatternToRegEx(match).test(location.href))
									for (let j of cs.js)
										if (regexPath.test(j))
											return b.runtime.getURL(j)
					})()
					: null
				)
		}) /* eslint-enable */
			.toString().slice(7, -1).replace("REGEX", `/.*dsabp.*\\/.*?(index|dsabp)${ext}$|dsabp${ext}$/`)
		, { minify: true })
	).code
}

function time() {
	return new Date().toISOString().substring(17, 23)
}

/** @param {...[regex: RegExp, replacement: string]} patterns */
function replacePl(...patterns) {
	return {
		name: "replace",
		setup(build) {
			build.onLoad({ filter: /.*.ts/ }, async (args) => {
				let contents = await readFile(args.path, "utf8")
				for (const p of patterns)
					contents = contents.replaceAll(p[0], p[1])
				return { contents, loader: "default" }
			})
		}
	}
}

/** @param {RegExp} fileFilter */
function srcMapExcludePl(fileFilter) {
	return {
		name: "srcMapExclude",
		setup(build) {
			build.onLoad({ filter: fileFilter }, async (args) => {
				const contents = await readFile(args.path, "utf8")
					+ "\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ=="
				return { contents, loader: "default" }
			})
		},
	}
}
