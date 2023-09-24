import { BPCmd } from "./BPCmd.js"
import { BuildBits } from "./BuildBits.js"
import { Item } from "./constants/ItemEnum.js"
import { Shape } from "./constants/ShapeEnum.js"
import { CmdType, BuildCmdIndex as Index } from "./constants/private.js"
import { BuildCmdOptions } from "./types.js"

export class BuildCmd extends BPCmd implements BuildCmdOptions {

	x: BuildCmdOptions["x"]
	y: BuildCmdOptions["y"]
	item: BuildCmdOptions["item"]
	bits: BuildCmdOptions["bits"]
	shape: BuildCmdOptions["shape"]

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
		this.item = Item.getById(arr[Index.ITEM])
		this.bits = typeof arr[Index.BITS] != "undefined" ? new BuildBits(arr[Index.BITS]) : undefined
		this.shape = Shape.getByValue(arr[Index.SHAPE])
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
			arr[Index.ITEM] = this.item.id

		if (this.bits !== undefined)
			arr[Index.BITS] = this.bits.int

		if (this.shape !== undefined && this.shape != Shape.BLOCK) { // game defaults to block
			arr[Index.SHAPE] = this.shape.enumValue

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
