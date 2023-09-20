import { Blueprint } from "./Blueprint.js"
import { ConfigCmd } from "./ConfigCmd.js"
import { Decoder } from "./Decoder.js"
import { Encoder } from "./Encoder.js"
import { DecoderOptions } from "./types.js"
import * as util from "./util.js"

export { BPCmd } from "./BPCmd.js"
export { BuildBits } from "./BuildBits.js"
export { BuildCmd } from "./BuildCmd.js"
export { Enum } from "./constants/Enum.js"
export * from "./constants/public.js"
export * from "./types.js"
export { Blueprint, ConfigCmd, Decoder, Encoder }

/**
 * Synchronously decodes a blueprint string.
 * Supports the "DSA:" prefix (case-insensitive).
 * @param input The blueprint string.
 * @param options Decoding options.
 * @example
 * import { decodeSync } from "dsabp-js"
 * 
 * const bp = decodeSync(str)
 */
export function decodeSync(input: string, options?: DecoderOptions) {
	return new Decoder().decodeSync(input, options)
}

/**
 * Asynchronously decodes a blueprint string.
 * Supports the "DSA:" prefix (case-insensitive).
 * @param input The blueprint string.
 * @param options Decoding options.
 * @example
 * import { decode } from "dsabp-js"
 * 
 * const bp = await decode(str)
 */
export async function decode(input: string, options?: DecoderOptions) {
	return util.decodeAsync(input, options)
}

/**
 * Synchronously decodes the data of a {@link ConfigCmd} containing raw data.
 * @see {@link DecoderOptions.ignoreConfigCmdData} for more info.
 * @returns The same input instance, with decoded data.
 */
export function decodeConfigCmdSync(cmd: ConfigCmd) {
	return new Decoder().decodeConfigCmdSync(cmd)
}

/**
 * Asynchronously decodes the data of a {@link ConfigCmd} containing raw data.
 * @see {@link DecoderOptions.ignoreConfigCmdData} for more info.
 * @returns The same input instance, with decoded data.
 */
export async function decodeConfigCmd(cmd: ConfigCmd) {
	if (!(cmd instanceof ConfigCmd))
		throw new TypeError(`input must be a ${ConfigCmd.name}`)
	if (!cmd.isRaw) return cmd
	const dataArr = await util.decodeConfigCmdAsync(cmd.rawData)
	cmd.rawData = undefined
	return cmd.fillDataFromArray(dataArr)
}

/**
 * Synchronously encodes a {@link Blueprint} into a blueprint string.
 * Does not include the "DSA:" prefix, consider adding it on a public app.
 * @param input The blueprint to encode.
 * @example
 * import { encodeSync, PREFIX } from "dsabp-js"
 * 
 * const str = PREFIX + encodeSync(bp)
 */
export function encodeSync(input: Blueprint) {
	return new Encoder().encodeSync(input)
}

/**
 * Asynchronously encodes a {@link Blueprint} into a blueprint string.
 * Does not include the "DSA:" prefix, consider adding it on a public app.
 * @param input The blueprint to encode.
 * @example
 * import { encode, PREFIX } from "dsabp-js"
 * 
 * const str = PREFIX + await encode(bp)
 */
export function encode(input: Blueprint) {
	return util.encodeAsync(input)
}
