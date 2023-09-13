export const b64toUi8 = (str: string) => Uint8Array.from(atob(str), c => c.charCodeAt(0))

export const ui8tob64 = (ui8: Uint8Array) => btoa(String.fromCharCode.apply(null, ui8))

export function createWorker() {
	const insideWorker = async info => {
		let lib: typeof import(".") // eslint-disable-line
		self.addEventListener("message", async (e: MessageEvent) => {
			const data = e.data
			while (!lib) await new Promise(r => setTimeout(r, 0))
			//
			if (data.cmd == "decode") {
				try {
					data.result = new lib.Decoder().decodeSync(data.args.input, data.args.options)
						.toArray()
				} catch (err) {
					data.err = err
				}
				delete data.args
				self.postMessage(data)
			} else if (data.cmd == "decodeConfigCmd") {
				try {
					data.result = new lib.Decoder().decodeConfigCmdData(data.args.rawData)
				} catch (err) {
					data.err = err
				}
				delete data.args
				self.postMessage(data)
			} else if (data.cmd == "encode") {
				try {
					const bp = new lib.Blueprint().fillFromArray(data.args.input)
					data.result = new lib.Encoder().encodeSync(bp)
				} catch (err) {
					data.err = err
				}
				delete data.args
				self.postMessage(data)
			}
			//
		})
		if (info.bundleInfo.format == "iife") {
			importScripts(info.path)
			lib = globalThis[info.bundleInfo.globalName]
		} else lib = await import(info.path)
	}

	const workerData = {
		path: import.meta.url,
		bundleInfo: null // @build_bundleInfo
	}
	return new Worker(URL.createObjectURL(new Blob([
		`(${insideWorker.toString()})(${JSON.stringify(workerData)})`
	], { type: "text/javascript;charset=utf-8" })))
}
