import { Worker } from "worker_threads"

export function createWorker() {
	const insideWorker = async info => {
		const { parentPort: self } = require("worker_threads") // eslint-disable-line
		let lib: typeof import(".") // eslint-disable-line
		self.on("message", async data => {
			while (!lib) await new Promise(r => setTimeout(r, 0))
			//
			if (data.cmd == "decode") {
				try {
					data.result = new lib.Decoder().decodeSync(data.args.input, data.args.options)
						.toArray()
				} catch (err) {
					data.err = err.message
				}
				delete data.args
				self.postMessage(data)
			} else if (data.cmd == "decodeConfigCmd") {
				try {
					data.result = new lib.Decoder().decodeConfigCmdData(data.args.rawData)
				} catch (err) {
					data.err = err.message
				}
				delete data.args
				self.postMessage(data)
			} else if (data.cmd == "encode") {
				try {
					const bp = new lib.Blueprint().fillFromArray(data.args.input)
					data.result = new lib.Encoder().encodeSync(bp)
				} catch (err) {
					data.err = err.message
				}
				delete data.args
				self.postMessage(data)
			}
			//
		})
		lib = await import(info.bundleInfo ? ("file://" + info.path) : new URL("index.js", info.path).toString())
	}

	const workerData = {
		path: import.meta.url,
		bundleInfo: null // @build_bundleInfo
	}
	return new Worker(
		`(${insideWorker.toString()})(${JSON.stringify(workerData)})`
		, { eval: true }
	)
}
