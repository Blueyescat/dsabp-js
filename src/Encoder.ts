import { DeflateOptions, deflateSync as fflate_deflateSync } from "fflate" // @build_browser-only
import { deflateRawSync as zlib_deflateRawSync } from "zlib" // @build_node-only
import { Blueprint } from "./Blueprint.js"
import { BuildCmd } from "./BuildCmd.js"
import { ConfigCmd } from "./ConfigCmd.js"
import { ConfigCmdIndex, TAG } from "./constants/private.js"
import { ui8tob64 } from "./injBrowser.js" // @build_browser-only

/**
 * Internally created by the {@link encode} and	{@link encodeSync} methods.
 * 
 * There doesn't seem to be any benefit to using the same instance,
 * but it is possible to do so only with the sync method.
 */
export class Encoder {
	/** @private Only exists in browser build. */
	static fflate_deflateSync: (data: Uint8Array, opts?: DeflateOptions) => Uint8Array = fflate_deflateSync // @build_browser-only
	#textEncoder: TextEncoder
	#bytes: Uint8Array
	#view: DataView
	#pos: number

	constructor() {
		this.#textEncoder = new TextEncoder()
	}

	#init(size: number) {
		this.#view = new DataView(new ArrayBuffer(size))
		this.#bytes = new Uint8Array(this.#view.buffer)
		this.#pos = 0
	}

	/** {@inheritDoc encode} */
	encodeSync(bp: Blueprint) {
		if (!(bp instanceof Blueprint))
			throw new TypeError(`input must be an instance of ${Blueprint.name}`)

		const initSize = bp.commands.length
			? Math.max(bp.commands.length * 20, 512) // rough estimate based on cmd amount
			: 4096
		this.#init(initSize)
		this.#write(bp.toArray(true))

		const encoded = this.#bytes.slice(0, this.#pos)

		if (typeof zlib_deflateRawSync != "undefined") {
			const deflated = zlib_deflateRawSync(encoded, { level: 9 })
			return deflated.toString("base64")
		} else {
			const deflated = fflate_deflateSync(encoded, { level: 9 })
			return ui8tob64(deflated)
		}
	}

	#encodeArray(arr) {
		this.#init(128)
		this.#write(arr)
		return this.#bytes.slice(0, this.#pos)
	}

	#write(obj) {
		if (typeof obj == "number" || typeof obj == "bigint") {
			this.#writeNumber(obj)
		} else if (typeof obj == "boolean") {
			this.#writeU8(obj ? TAG.TRUE : TAG.FALSE)
		} else if (typeof obj == "string") {
			this.#writeStr(obj)
		} else if (obj == null) {
			this.#writeU8(TAG.NULL)
		} else if (Array.isArray(obj)) {
			this.#writeArr(obj)
		} else if (obj instanceof Uint8Array) {
			this.#writeBin(obj)
		} else if (obj instanceof BuildCmd) {
			this.#writeArr(obj.toArray())
		} else if (obj instanceof ConfigCmd) {
			const arr = obj.toArray()
			if (Array.isArray(arr[ConfigCmdIndex.DATA])) // it is not raw data, encode it
				arr[ConfigCmdIndex.DATA] = new Uint8Array(new Encoder().#encodeArray(arr[ConfigCmdIndex.DATA]))
			this.#writeArr(arr)
		} else {
			throw new Error(`unsupported object: ${obj.constructor?.name} ${obj}`)
		}
	}

	#writeNumber(v: number | bigint, isSigned?: boolean) {
		let isBigInt = typeof v == "bigint"
		if (isBigInt && v <= 4294967295) {
			v = Number(v)
			isBigInt = false
		}

		// float
		if (!Number.isSafeInteger(v) && !isBigInt) {
			this.#writeU8(TAG.F32) // game uses F32?
			this.#writeF32(v)
			return
		}

		// single-byte fixint
		if (v >= -64 && v <= -1)
			return this.#writeI8(64 | ((v as number) & 127))
		else if (v >= 0 && v <= 63)
			return this.#writeI8(v)

		// int
		if (v < 0 || isSigned) {
			if (-128 <= v && v <= 127) {
				this.#writeU8(TAG.I8)
				this.#writeU8(v)
			} else if (-32768 <= v && v <= 32767) {
				this.#writeU8(TAG.I16)
				this.#writeI16(v)
			} else if (-2147483648 <= v && v <= 2147483647) {
				this.#writeU8(TAG.I32)
				this.#writeI32(v)
			} else {
				this.#writeU8(TAG.I64)
				this.#writeI64(BigInt(v))
			}
		} else {
			if (v <= 255) {
				this.#writeU8(TAG.U8)
				this.#writeU8(v)
			} else if (v <= 65535) {
				this.#writeU8(TAG.U16)
				this.#writeU16(v)
			} else if (v <= 4294967295) {
				this.#writeU8(TAG.U32)
				this.#writeU32(v)
			} else {
				this.#writeU8(TAG.U64)
				this.#writeU64(BigInt(v))
			}
		}
	}

	#writeStr(v) {
		const utf8arr = this.#textEncoder.encode(v)
		const len = utf8arr.byteLength
		if (len <= 255) {
			this.#writeU8(TAG.STR_L1)
			this.#writeU8(len)
		} else if (len <= 65535) {
			this.#writeU8(TAG.STR_L2)
			this.#writeU16(len)
		} else if (len <= 4294967295) {
			this.#writeU8(TAG.STR_L4)
			this.#writeU32(len)
		}
		this.#ensureSize(len)
		this.#bytes.set(utf8arr, this.#pos)
		this.#pos += len
	}

	#writeArr(arr) {
		this.#writeU8(TAG.ARRAY_BEGIN)
		for (const v of arr)
			this.#write(v)
		this.#writeU8(TAG.ARRAY_END)
	}

	#writeBin(obj) {
		const size = obj.byteLength
		if (size <= 255) {
			this.#writeU8(TAG.BYTES_L1)
			this.#writeU8(size)
		} else if (size <= 65535) {
			this.#writeU8(TAG.BYTES_L2)
			this.#writeU16(size)
		} else if (size <= 4294967295) {
			this.#writeU8(TAG.BYTES_L4)
			this.#writeU32(size)
		}
		this.#writeU8arr(obj)
	}

	#writeU8(v) {
		this.#ensureSize(1)
		this.#view.setUint8(this.#pos, v)
		this.#pos++
	}
	#writeU16(v) {
		this.#ensureSize(2)
		this.#view.setUint16(this.#pos, v, true)
		this.#pos += 2
	}
	#writeU32(v) {
		this.#ensureSize(4)
		this.#view.setUint32(this.#pos, v, true)
		this.#pos += 4
	}
	#writeU64(v) {
		this.#ensureSize(8)
		this.#view.setBigUint64(this.#pos, v, true)
		this.#pos += 8
	}

	#writeI8(v) {
		this.#ensureSize(1)
		this.#view.setInt8(this.#pos, v)
		this.#pos++
	}
	#writeI16(v) {
		this.#ensureSize(2)
		this.#view.setInt16(this.#pos, v, true)
		this.#pos += 2
	}
	#writeI32(v) {
		this.#ensureSize(4)
		this.#view.setInt32(this.#pos, v, true)
		this.#pos += 4
	}
	#writeI64(v) {
		this.#ensureSize(8)
		this.#view.setBigInt64(this.#pos, v, true)
		this.#pos += 8
	}

	#writeF32(v) {
		this.#ensureSize(4)
		this.#view.setFloat32(this.#pos, v, true)
		this.#pos += 4
	}
	/* #writeF64(v) {
		this.#ensureSize(8)
		this.#view.setFloat64(this.#pos, v, true)
		this.#pos += 8
	} */

	#writeU8arr(values) {
		this.#ensureSize(values.length)
		this.#bytes.set(values, this.#pos)
		this.#pos += values.length
	}

	#ensureSize(size) {
		const req = this.#pos + size
		if (req <= this.#view.byteLength) return

		const buff = new ArrayBuffer(Math.max(req, this.#view.byteLength + 128))
		const bytes = new Uint8Array(buff)
		const view = new DataView(buff)
		bytes.set(this.#bytes)
		this.#view = view
		this.#bytes = bytes
	}
}
