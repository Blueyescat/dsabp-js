import { BPCmd } from "./BPCmd.js"
import { CfgMsgKey, CmdType, ConfigCmdIndex as Index, LoaderCfgIndex, PusherCfgIndex } from "./constants/private.js"
import { FilterMode, FixedAngle, LoaderPoint, LoaderPriority, PusherMode } from "./constants/public.js"
import { ConfigCmdOptions, LoaderConfig, PusherConfig } from "./types.js"

let defaults: Required<ConfigCmdOptions> = {
	filterMode: FilterMode.ALLOW_ALL,
	filterItems: [0, 0, 0],
	angle: 0,
	fixedAngle: FixedAngle.RIGHT,
	pusher: {
		defaultMode: PusherMode.DO_NOTHING,
		filteredMode: PusherMode.PUSH,
		angle: 0,
		targetSpeed: 20,
		filterByInventory: false,
		maxBeamLength: 1000
	},
	loader: {
		pickupPoint: LoaderPoint.LEFT,
		dropPoint: LoaderPoint.RIGHT,
		priority: LoaderPriority.NORMAL,
		stackLimit: 16,
		cycleTime: 20,
		requireOutputInventory: false,
		waitForStackLimit: false
	}
}

const msgKey_prop: { [K in typeof CfgMsgKey[keyof typeof CfgMsgKey]]: keyof ConfigCmdOptions } = {
	filter_config: "filterMode",
	filter_items: "filterItems",
	angle: "angle",
	angle_fixed: "fixedAngle",
	config_pusher: "pusher",
	config_loader: "loader"
}
for (const key in msgKey_prop) { msgKey_prop[msgKey_prop[key]] = key }

export class ConfigCmd extends BPCmd implements ConfigCmdOptions {
	/**
	 * An object for default config values, intented to match the game's defaults.
	 * Used for properties that are `null` during encoding.
	 * 
	 * You can modify this as you wish, so that you don't have to depend on the defaults of the library.
	 * See the object definition in [ConfigCmd.ts](https://github.com/Blueyescat/dsabp-js/blob/main/src/ConfigCmd.ts).
	 */
	static get defaults() {
		return defaults
	}
	static set defaults(input) {
		if (input != null && Object.getPrototypeOf(input) != Object.prototype)
			throw new TypeError("defaults can only be set to an Object literal")
		defaults = input
	}

	/** @private */ rawData: Uint8Array

	/** @inheritDoc */ filterMode: ConfigCmdOptions["filterMode"]
	/** @inheritDoc */ filterItems: ConfigCmdOptions["filterItems"]
	/** @inheritDoc */ angle: ConfigCmdOptions["angle"]
	/** @inheritDoc */ fixedAngle: ConfigCmdOptions["fixedAngle"]
	/** @inheritDoc */ pusher: ConfigCmdOptions["pusher"] = {}
	/** @inheritDoc */ loader: ConfigCmdOptions["loader"] = {}

	/**
	 * @param input If omitted, the config will be empty.
	 * The game won't modify the existing config of an already placed object if the config command is empty.
	 */
	constructor(input?: ConfigCmdOptions) {
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
	set(input: ConfigCmdOptions): this {
		return Object.assign(this, input)
	}

	/** [cmdType, cfgMsg: null | any[] | Uint8Array] @private */
	fillFromArray(arr: any[]) {
		if (arr[Index.DATA] == null)
			return this

		if (arr[Index.DATA] instanceof Uint8Array)
			return this.rawData = arr[Index.DATA], this

		arr = arr[Index.DATA]

		for (let i = 0; i < arr.length; i++) {
			if (i <= 1) continue // ignore first 2 zeros, unknown
			if (typeof arr[i] == "string" // assume a string = key
				&& arr[i + 1] === 0 // assume following 0 means value next
			) {
				const msgKey = arr[i]
				let val = arr[i + 2]

				if (Array.isArray(val))
					val = cfgArrToObj(msgKey, val) ?? val

				this[msgKey_prop[msgKey] ?? msgKey] = val
				i += 2
			}
		}
		return this
	}

	/** @private */
	fillDataFromArray(data: any[]) {
		const arr = []
		arr[Index.TYPE] = CmdType.CONFIG
		arr[Index.DATA] = data
		return this.fillFromArray(arr)
	}

	/** @private */
	toArray() {
		const arr = []
		arr[Index.TYPE] = CmdType.CONFIG

		if (this.isRaw) {
			arr[Index.DATA] = this.rawData
			return arr
		}

		// follows the same format commented in fillFromArray
		arr[Index.DATA] = [0, 0]
		for (const prop of Object.keys(this)) {
			let val = structuredClone(this[prop])
			const msgKey = msgKey_prop[prop] ?? prop

			if (val === undefined) continue // undefined values meant to be excluded
			if (val === null || Object.getPrototypeOf(val) == Object.prototype) {
				if (val !== null && !Object.keys(val).length)
					continue // ignore empty objects
				val = cfgObjToArr(msgKey, val)
			} else if (!Array.isArray(val)) {
				val = [val]
			}
			arr[Index.DATA].push(msgKey, 0, val)
		}
		return arr
	}

	/**
	 * Checks whether the data of this command is not decoded. Comes from decoding a blueprint with
	 * {@link DecoderOptions.ignoreConfigCmdData} = `true`.
	 * 
	 * @see {@link DecoderOptions.ignoreConfigCmdData} for more info.
	 */
	get isRaw() {
		return this.rawData instanceof Uint8Array
	}

	/**
	 * Checks whether this command has the same configuration as the target command.
	 */
	equals(target: ConfigCmd) {
		return deepEquals(this, target)
	}

	clone(): ConfigCmd {
		const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
		if (this.rawData)
			clone.rawData = new Uint8Array(this.rawData)
		return clone
	}
}

function deepEquals(a, b): boolean {
	if (a === b) return true
	if (a?.constructor !== b?.constructor) return false
	const keysA = Object.keys(a)
	return a && b
		&& typeof a === "object" && typeof b === "object"
		? (keysA.length === Object.keys(b).length
			&& keysA.every(key => deepEquals(a[key], b[key])))
		: a === b
}

function cfgArrToObj(key: string, arr: any[]) {
	switch (key) {
		case CfgMsgKey.FILTER_CONFIG:
		case CfgMsgKey.ANGLE:
			return arr[0]
		case CfgMsgKey.FILTER_ITEMS:
			return arr
		case CfgMsgKey.LOADER:
			return {
				pickupPoint: LoaderPoint.getByValue(arr[LoaderCfgIndex.PICKUP_POINT]),
				dropPoint: LoaderPoint.getByValue(arr[LoaderCfgIndex.DROP_POINT]),
				priority: LoaderPriority.getByValue(arr[LoaderCfgIndex.PRIORTY]),
				stackLimit: arr[LoaderCfgIndex.STACK_LIMIT],
				cycleTime: arr[LoaderCfgIndex.CYCLE_TIME],
				requireOutputInventory: arr[LoaderCfgIndex.REQUIRE_OUTPUT_INVENTORY],
				waitForStackLimit: arr[LoaderCfgIndex.WAIT_FOR_STACK_LIMIT],
			}
		case CfgMsgKey.PUSHER:
			return {
				defaultMode: PusherMode.getByValue(arr[PusherCfgIndex.DEFAULT_MODE]),
				filteredMode: PusherMode.getByValue(arr[PusherCfgIndex.FILTERED_MODE]),
				angle: arr[PusherCfgIndex.ANGLE],
				targetSpeed: arr[PusherCfgIndex.TARGET_SPEED],
				filterByInventory: arr[PusherCfgIndex.FILTER_BY_INVENTORY],
				maxBeamLength: arr[PusherCfgIndex.MAX_BEAM_LENGTH],
			}
		case CfgMsgKey.ANGLE_FIXED:
			return FixedAngle.getByValue(arr[0])
	}
}

function cfgObjToArr(key: string, obj: LoaderConfig | PusherConfig | FixedAngle) {
	const a = []
	if (obj !== null) { // delete props that are set to null, so they will be overwritten
		for (const key in obj)
			if (obj[key] === null)
				delete obj[key]
	}
	switch (key) {
		case CfgMsgKey.LOADER:
			obj = { ...defaults.loader, ...obj } as LoaderConfig
			a[LoaderCfgIndex.PICKUP_POINT] = obj.pickupPoint?.enumValue
			a[LoaderCfgIndex.DROP_POINT] = obj.dropPoint?.enumValue
			a[LoaderCfgIndex.PRIORTY] = obj.priority?.enumValue
			a[LoaderCfgIndex.STACK_LIMIT] = obj.stackLimit
			a[LoaderCfgIndex.CYCLE_TIME] = obj.cycleTime
			a[LoaderCfgIndex.REQUIRE_OUTPUT_INVENTORY] = obj.requireOutputInventory
			a[LoaderCfgIndex.WAIT_FOR_STACK_LIMIT] = obj.waitForStackLimit
			break
		case CfgMsgKey.PUSHER:
			obj = { ...defaults.pusher, ...obj } as PusherConfig
			a[PusherCfgIndex.DEFAULT_MODE] = obj.defaultMode?.enumValue
			a[PusherCfgIndex.FILTERED_MODE] = obj.filteredMode?.enumValue
			a[PusherCfgIndex.ANGLE] = obj.angle
			a[PusherCfgIndex.TARGET_SPEED] = obj.targetSpeed
			a[PusherCfgIndex.FILTER_BY_INVENTORY] = obj.filterByInventory
			a[PusherCfgIndex.MAX_BEAM_LENGTH] = obj.maxBeamLength
			break
		case CfgMsgKey.ANGLE_FIXED:
			a[0] = (obj as FixedAngle ?? defaults.fixedAngle).enumValue
			break
	}
	return a
}
