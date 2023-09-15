import { BPCmd } from "./BPCmd.js"
import { BuildBits } from "./BuildBits.js"
import { CmdType, BuildCmdIndex as Index } from "./constantsPrivate.js"
import { BuildCmdOptions } from "./types.js"

export class BuildCmd extends BPCmd implements BuildCmdOptions {

	/** @inheritDoc */ x: BuildCmdOptions["x"]
	/** @inheritDoc */ y: BuildCmdOptions["y"]
	/** @inheritDoc */ item: BuildCmdOptions["item"]
	/** @inheritDoc */ bits: BuildCmdOptions["bits"]
	/** @inheritDoc */ shape: BuildCmdOptions["shape"]

	constructor(input?: BuildCmdOptions) {
		super()
		for (const prop in this)
			Object.defineProperty(this, prop, { configurable: false })
		if (input != null) {
			if (Object.getPrototypeOf(input) != Object.prototype)
				throw new TypeError("input must be an Object literal")
			this.set(input)
		}
	}

	/** Changes multiple properties of the command. */
	set(input: BuildCmdOptions): this {
		return Object.assign(this, input)
	}

	/** @private */
	fillFromArray(arr: any[]) {
		this.x = arr[Index.X]
		this.y = arr[Index.Y]
		this.item = arr[Index.ITEM]
		this.bits = typeof arr[Index.BITS] != "undefined" ? new BuildBits(arr[Index.BITS]) : undefined
		this.shape = arr[Index.SHAPE]
		return this
	}

	/** @private */
	toArray() {
		const arr = []
		arr[Index.TYPE] = CmdType.BUILD

		if (this.x !== undefined)
			arr[Index.X] = this.x

		if (this.y !== undefined)
			arr[Index.Y] = this.y

		if (this.item !== undefined)
			arr[Index.ITEM] = this.item

		if (this.bits !== undefined)
			arr[Index.BITS] = this.bits.int

		if (this.shape !== undefined && this.shape != 0) { // ignore shape if 0 (game default)
			arr[Index.SHAPE] = this.shape

			if (typeof arr[Index.BITS] == "undefined") // can't have shape without bits
				arr[Index.BITS] = 1n
		}
		return arr
	}

	clone(): BuildCmd {
		const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
		if (this.bits)
			clone.bits = this.bits.clone()
		return clone
	}
}
