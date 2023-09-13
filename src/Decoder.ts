import { Buffer } from "buffer" // @build_node-only
import { inflateSync as fflate_inflateSync } from "fflate" // @build_browser-only
import { inflateRawSync as zlib_inflateRawSync } from "zlib" // @build_node-only
import { Blueprint } from "./Blueprint.js"
import { BuildCmd } from "./BuildCmd.js"
import { ConfigCmd } from "./ConfigCmd.js"
import { BuildCmdIndex, CmdType, ConfigCmdIndex, PREFIX, TAG } from "./constants.js"
import { b64toUi8 } from "./injBrowser.js" // @build_browser-only
import { DecoderOptions } from "./types.js"

const enum ArrType {
	NONE,
	UNKNOWN,
	TOP,
	CMDS,
	CMD,
	CFG
}

const arrTypeMap = {
	[ArrType.NONE]: ArrType.TOP,
	[ArrType.TOP]: ArrType.CMDS,
	[ArrType.CMDS]: ArrType.CMD,
	[ArrType.CMD]: ArrType.CFG,
}

/**
 * Internally created by the {@link decode}, {@link decodeSync}, {@link decodeConfigCmd} and {@link decodeConfigCmdSync} functions.
 * 
 * There doesn't seem to be any benefit to using the same instance,
 * but it is possible to do so only with the sync methods.
 */
export class Decoder {
	#textDecoder: TextDecoder
	#bytes: Uint8Array
	#view: DataView
	#pos: number
	#lastArrType: number
	options: DecoderOptions

	constructor() {
		this.#textDecoder = new TextDecoder("utf-8")
	}

	/** @hidden */
	#init(buff: Buffer | Uint8Array, lastArrType: ArrType) {
		this.#bytes = new Uint8Array(buff)
		this.#view = new DataView(buff.buffer)
		this.#pos = 0
		this.#lastArrType = lastArrType ?? ArrType.NONE
	}

	/** @inheritDoc decodeSync */
	decodeSync(input: string, options: DecoderOptions = {}): Blueprint {
		if (typeof input != "string")
			throw new TypeError("input must be a string")

		if (input.substring(0, PREFIX.length).toUpperCase() == PREFIX)
			input = input.substring(PREFIX.length)

		if (typeof options.ignoreConfigCmdData == "undefined")
			options.ignoreConfigCmdData = false
		this.options = options

		let inflated: Buffer | Uint8Array
		if (typeof zlib_inflateRawSync != "undefined") {
			const b64decoded = Buffer.from(input, "base64")
			inflated = zlib_inflateRawSync(b64decoded)
		} else {
			const b64decoded = b64toUi8(input)
			inflated = fflate_inflateSync(b64decoded)
		}
		this.#init(inflated, ArrType.NONE)
		return new Blueprint().fillFromArray(this.#read(), true)
	}

	/** @inheritDoc decodeConfigCmdSync */
	decodeConfigCmdSync(cmd: ConfigCmd) {
		if (!(cmd instanceof ConfigCmd))
			throw new TypeError(`input must be a ${ConfigCmd.name}`)
		if (!cmd.isRaw) return cmd
		const dataArr = this.decodeConfigCmdData(cmd.rawData)
		cmd.rawData = undefined
		return cmd.fillDataFromArray(dataArr)
	}

	/** @private */
	decodeConfigCmdData(rawCmd: Uint8Array) {
		this.#init(rawCmd, ArrType.CMD)
		return this.#read()
	}

	#read() {
		while (this.#pos < this.#bytes.length) {
			const b = this.#bytes[this.#pos++]
			if (b <= 63) return b // positive fixint
			if (b <= 127) return b - 128 // negative fixint
			switch (b) {
				case TAG.ARRAY_BEGIN: return this.#readArray()
				case TAG.U8: return this.#readU8()
				case TAG.U16: return this.#readU16()
				case TAG.U32: return this.#readU32()
				case TAG.U64: return this.#readU64()
				case TAG.I8: return this.#readI8()
				case TAG.I16: return this.#readI16()
				case TAG.I32: return this.#readI32()
				case TAG.I64: return this.#readI64()
				case TAG.F32: return this.#readF32()
				case TAG.F64: return this.#readF64()
				case TAG.NULL: return null
				case TAG.TRUE: return true
				case TAG.FALSE: return false
				case TAG.BYTES_L1: return this.#readBytes(this.#getU8(), 1)
				case TAG.BYTES_L2: return this.#readBytes(this.#getU16(), 2)
				case TAG.BYTES_L4: return this.#readBytes(this.#getU32(), 4)
				case TAG.STR_L1: return this.#readStr(this.#getU8(), 1)
				case TAG.STR_L2: return this.#readStr(this.#getU16(), 2)
				case TAG.STR_L4: return this.#readStr(this.#getU32(), 4)
			}
			throw new Error(`unsupported byte: ${b} (0x${b.toString(16)})`)
		}
	}

	#readArray() {
		const arr = []
		const prevArrType = this.#lastArrType
		this.#lastArrType = arrTypeMap[prevArrType] ?? ArrType.UNKNOWN
		const currArrType = this.#lastArrType

		while (this.#pos < this.#bytes.length) {
			// when reading the array ends
			if (this.#bytes[this.#pos] == TAG.ARRAY_END) {
				this.#pos++
				this.#lastArrType = prevArrType

				// if the array read is a command array, return a Cmd instance instead of the array
				if (currArrType == ArrType.CMD) {
					if (arr[BuildCmdIndex.TYPE] === CmdType.BUILD)
						return new BuildCmd().fillFromArray(arr)
					if (arr[ConfigCmdIndex.TYPE] === CmdType.CONFIG)
						return new ConfigCmd().fillFromArray(arr)
				}

				return arr
			}
			arr.push(this.#read())
		}
	}

	#readU8() {
		const v = this.#view.getUint8(this.#pos)
		this.#pos++
		return v
	}
	#readU16() {
		const v = this.#view.getUint16(this.#pos, true)
		this.#pos += 2
		return v
	}
	#readU32() {
		const v = this.#view.getUint32(this.#pos, true)
		this.#pos += 4
		return v
	}
	#readU64() {
		const v = this.#view.getBigUint64(this.#pos, true)
		this.#pos += 8
		return v
	}

	#readI8() {
		const v = this.#view.getInt8(this.#pos)
		this.#pos++
		return v
	}
	#readI16() {
		const v = this.#view.getInt16(this.#pos, true)
		this.#pos += 2
		return v
	}
	#readI32() {
		const v = this.#view.getInt32(this.#pos, true)
		this.#pos += 4
		return v
	}
	#readI64() {
		const v = this.#view.getBigInt64(this.#pos, true)
		this.#pos += 8
		return v
	}

	#readF32() {
		const v = this.#view.getFloat32(this.#pos, true)
		this.#pos += 4
		return v
	}
	#readF64() {
		const v = this.#view.getFloat64(this.#pos, true)
		this.#pos += 8
		return v
	}

	#getU8() {
		return this.#view.getUint8(this.#pos)
	}
	#getU16() {
		return this.#view.getUint16(this.#pos, true)
	}
	#getU32() {
		return this.#view.getUint32(this.#pos, true)
	}

	#readStr(byteLength, headerOffset) {
		const offset = this.#pos + headerOffset
		const str = this.#textDecoder.decode(this.#bytes.slice(offset, offset + byteLength))
		this.#pos += headerOffset + byteLength
		return str
	}

	/** May return an array if reading a config data, otherwise Uint8Array */
	#readBytes(byteLength, headOffset) {
		// if reading a byte array in a cmd array, it is config data
		const readConfig = this.options.ignoreConfigCmdData !== true && this.#lastArrType == ArrType.CMD

		const offset = this.#pos + headOffset
		const arr = this.#bytes.slice(offset, offset + byteLength)
		this.#pos = offset
		if (readConfig)
			return this.#read() // directly start decoding the bytes inside the byte array
		this.#pos += byteLength
		return arr
	}
}
