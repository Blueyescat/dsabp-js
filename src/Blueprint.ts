import { BuildCmd } from "./BuildCmd.js"
import { ConfigCmd } from "./ConfigCmd.js"
import { BuildCmdIndex, CmdType, ConfigCmdIndex, BlueprintIndex as Index } from "./constants.js"
import { BlueprintOptions } from "./types.js"

// Should use Required<> but docs won't be inherited..
export class Blueprint implements BlueprintOptions {

	/** @inheritDoc */ version: BlueprintOptions["version"]
	/** @inheritDoc */ width: BlueprintOptions["width"]
	/** @inheritDoc */ height: BlueprintOptions["height"]
	/** @inheritDoc */ commands: BlueprintOptions["commands"]

	/**
	 * @param input Defaults to a 1x1 blueprint with no commands and version 0.
	 */
	constructor(input?: BlueprintOptions) {
		for (const prop in this)
			Object.defineProperty(this, prop, { configurable: false })
		if (typeof input == "undefined") {
			this.version = 0
			this.width = 1
			this.height = 1
			this.commands = []
		} else if (input != null && Object.getPrototypeOf(input) == Object.prototype) {
			this.version = input.version ?? 0
			this.width = input.width ?? 1
			this.height = input.height ?? 1
			if (input.commands != null) {
				if (!Array.isArray(input.commands))
					throw new TypeError("input.commands must be an array")
				this.commands = input.commands
			} else {
				this.commands = []
			}
		} else {
			throw new TypeError("input must be an Object literal")
		}
	}

	/** Changes multiple properties of the blueprint. */
	set(input: BlueprintOptions): this {
		return Object.assign(this, input)
	}

	/** @private */
	fillFromArray(arr: any[], shallow?: boolean) {
		this.version = arr[Index.VER]
		this.width = arr[Index.WIDTH]
		this.height = arr[Index.HEIGHT]
		this.commands = shallow ? arr[Index.CMDS]
			: arr[Index.CMDS].map(cmd => {
				if (cmd[BuildCmdIndex.TYPE] == CmdType.BUILD)
					return new BuildCmd().fillFromArray(cmd)
				if (cmd[ConfigCmdIndex.TYPE] == CmdType.CONFIG)
					return new ConfigCmd().fillFromArray(cmd)
			})
		return this
	}

	/** @private */
	toArray(shallow?: boolean) {
		const arr = []
		arr[Index.VER] = this.version
		arr[Index.WIDTH] = this.width
		arr[Index.HEIGHT] = this.height
		arr[Index.CMDS] = shallow ? this.commands : this.commands.map(c => c.toArray())
		return arr
	}

	/**
	 * @returns A new instance with the same properties. (Deep clone)
	 */
	clone(): Blueprint {
		const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
		if (this.commands)
			clone.commands = this.commands.map(c => c.clone())
		return clone
	}
}
