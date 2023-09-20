import { Enum } from "./Enum.js"

export const PREFIX = "DSA:"

/** The mode of a pusher config. */
export class PusherMode extends Enum<number> {
	static PUSH = new this(0)
	static PULL = new this(1)
	static DO_NOTHING = new this(2)
	static { this.end() }
}

/** The pickup or drop point of a loader config. */
export class LoaderPoint extends Enum<number> {
	static TOP_LEFT = new this(0)
	static TOP = new this(1)
	static TOP_RIGHT = new this(2)
	static LEFT = new this(3)
	static RIGHT = new this(4)
	static BOTTOM_LEFT = new this(5)
	static BOTTOM = new this(6)
	static BOTTOM_RIGHT = new this(7)
	static { this.end() }
}

/** The priority of a loader config. */
export class LoaderPriority extends Enum<number> {
	static LOW = new this(0)
	static NORMAL = new this(1)
	static HIGH = new this(2)
	static { this.end() }
}

/** The mode of a filter config. */
export class FilterMode extends Enum<number> {
	static ALLOW_ALL = new this(0)
	static BLOCK_FILTER_ONLY = new this(1)
	static ALLOW_FILTER_ONLY = new this(2)
	static BLOCK_ALL = new this(3)
	static { this.end() }
}

export class FixedAngle extends Enum<number> {
	static RIGHT = new this(0)
	static UP = new this(1)
	static LEFT = new this(2)
	static DOWN = new this(3)
	static { this.end() }
}
