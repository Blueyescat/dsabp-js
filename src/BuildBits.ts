/**
 * Used to specify repeated placements along the X+ axis in a single build command.
 * `101` = place 2 objects with a space between. Cannot exceed 64 bits.
 */
export class BuildBits {
	/** @private */
	int: bigint

	/**
	 * @param input Use to initialize the bits by entering a binary string like `"11001"`.
	 *  Left to right. Trailing zeros are ignored.
	 * @throws SyntaxError if input string cannot be converted to a BigInt.
	 */
	constructor(input?: string | number | bigint) {
		if (input == null) {
			this.int = 0n
			return
		}
		if (typeof input == "string") {
			input = "0b" + reverse(input)
		} else if (typeof input != "number" && typeof input != "bigint") {
			throw new TypeError("input must be a number, bigint or string")
		}
		this.int = BigInt(input)
	}

	/**
	 * Sets a bit at an index (makes it `1`).
	 * @throws RangeError if the index is out of [0,63].
	 */
	set(index: number): this {
		if (index < 0 || index > 63) throw new RangeError("index must be between [0,63]")
		this.int |= mask(index)
		return this
	}

	/**
	 * Clears a bit at an index (makes it `0`).
	 * @throws RangeError if the index is out of [0,63].
	 */
	clear(index: number): this {
		if (index < 0 || index > 63) throw new RangeError("index must be between [0,63]")
		this.int &= ~mask(index)
		return this
	}

	/**
	 * Toggles a bit at an index.
	 * @param force If specified, it works as a shortcut for {@link set} (true) and {@link clear} (false).
	 * @throws RangeError if the index is out of [0,63].
	 */
	toggle(index: number, force?: boolean): this {
		if (index < 0 || index > 63) throw new RangeError("index must be between [0,63]")
		if (typeof force == "undefined")
			this.int ^= mask(index)
		else if (force === true)
			this.set(index)
		else if (force === false)
			this.clear(index)
		return this
	}

	/** Checks whether a bit at an index is set. */
	isSet(index: number): boolean {
		if (index < 0 || index > 63) return false
		return !!(this.int & mask(index))
	}

	/** Checks whether no bit is set. */
	isZero(): boolean {
		return this.int == 0n
	}

	/**
	 * Checks whether there is only one bit and it is set to `1`, which is likely
	 * just so that a shape can be specified in the encoded data.
	 */
	isOne(): boolean {
		return this.int == 1n
	}

	/**
	 * Removes leading zero bits. (Note that trailing zeros don't work anyway)
	 * @example
	 * const bits = new BuildBits("10100") // 101
	 * bits.del(0) // 001
	 * bits.trimLeadZeros() // 1
	 */
	trimLeadZeros(): this {
		if (this.int)
			this.int /= -this.int & this.int
		return this
	}

	/** @returns Amount of all the bits. */
	get size(): number {
		return this.int.toString(2).length
	}

	*[Symbol.iterator](): Iterator<boolean> {
		for (const b of reverse(this.int.toString(2))) {
			yield b == "1"
		}
	}

	/** @returns Booleans representing the set and unset bits. */
	toArray(): boolean[] {
		return Array.from(this)
	}

	/** @returns A string of 1's and 0's representing the set and unset bits. */
	toString(): string {
		return reverse(this.int.toString(2))
	}

	/** @hidden */
	get [Symbol.toStringTag]() {
		return this.toString()
	}

	/** Checks whether this bits equals to another. */
	equals(target: BuildBits) {
		return this.int === target?.int
	}

	/** @returns A new instance with the same bits. */
	clone(): BuildBits {
		return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
	}
}

function mask(i: number) {
	return 1n << BigInt(i)
}

function reverse(str: string) {
	if (str.length < 1) return str
	return str.split("").reduce((r, c) => c + r)
}
