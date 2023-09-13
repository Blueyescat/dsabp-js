import { isMainThread } from "worker_threads" // @build_node-only
import { Blueprint } from "./Blueprint.js"
import { createWorker as browser_createWorker } from "./injBrowser.js" // @build_browser-only
import { createWorker as node_createWorker } from "./injNode.js" // @build_node-only

const isNode = globalThis.process?.release?.name == "node"
const isWorkerThread = isNode ? !isMainThread : (typeof WorkerGlobalScope != "undefined" && self instanceof WorkerGlobalScope)

let wkMsgId = 0
const wkRequests = {}

export const worker = isWorkerThread ? null : (isNode ? node_createWorker : browser_createWorker)() as any

function handleWkMessage(data: { id: number; result: any; err: any }) {
	if (data.err)
		wkRequests[data.id].rej(data.err)
	else
		wkRequests[data.id].res(data.result)
	delete wkRequests[data.id]
}

if (!isWorkerThread) {
	if (isNode)
		worker.on("message", handleWkMessage)
	else
		worker.addEventListener("message", e => handleWkMessage(e.data))
}

function wkPromise(id: number) {
	return new Promise((res, rej) => wkRequests[id] = { res, rej })
}

export async function decodeAsync(input, options) {
	const id = wkMsgId++
	worker.postMessage({ id, cmd: "decode", args: { input, options } })
	return new Blueprint().fillFromArray(
		await wkPromise(id) as any[]
	)
}

export function decodeConfigCmdAsync(rawData) {
	const id = wkMsgId++
	worker.postMessage({ id, cmd: "decodeConfigCmd", args: { rawData } })
	return wkPromise(id) as Promise<any[]>
}

export function encodeAsync(input: Blueprint) {
	const id = wkMsgId++
	worker.postMessage({ id, cmd: "encode", args: { input: input.toArray() } })
	return wkPromise(id) as Promise<string>
}
