import { BPCmd } from "./BPCmd.js"
import { BuildBits } from "./BuildBits.js"
import { FilterMode, FixedAngle, LoaderPoint, LoaderPriority, PusherMode } from "./constants.js"

export interface DecoderOptions {
	/**
	 * A config command is an array in `[CmdType, null | configMessage]` format.
	 * `null` means that the config command is empty, and the game won't change config of the target object.
	 * `configMessage` contains the config values, and it will be referred to as "config data" in the docs.
	 * 
	 * Setting this option to `true` tells the decoder to ignore the config data while decoding a config command, but take the raw data.
	 * The `null` is still read. Whether the config data is not decoded can be checked using {@link ConfigCmd#isRaw | ConfigCmd#isRaw}.
	 * 
	 * A {@link Blueprint} containing non-decoded {@link ConfigCmd}s can still be encoded.
	 * The raw data can be decoded individually using the {@link decodeConfigCmd} function, when needed.
	 * 
	 * Consider enabling this if you don't need to read all the config commands,
	 * to avoid unnecessary use of resources and decode a little faster.
	 */
	ignoreConfigCmdData?: boolean
}

/**
 * All the properties can be set, and are required for a valid blueprint.
 */
export interface BlueprintOptions {
	/**
	 * Blueprint format version. 0 by default. At the time of writing, the game only accepts `0` and `-1`
	 * and considers them the same. Any further updates may require changes in the library.
	 * @defaultValue `0`
	 */
	version?: number
	/**
	 * Width of the blueprint area in square. [1, 100] integer.
	 * @defaultValue `1`
	 */
	width?: number
	/**
	 * Height of the blueprint area in square. [1, 100] integer.
	 * @defaultValue `1`
	 */
	height?: number
	/**
	 * All commands of the blueprint.
	 * @example
	 * for (const cmd of bp.commands) {
	 * 	if (cmd instanceof BuildCmd) {
	 * 		console.log(cmd.item)
	 * 	}
	 * }
	 * @defaultValue `[]`
	 */
	commands?: Array<BPCmd>
}

/**
 * All the properties can be set. Set to `undefined` to remove a property. {@link x}, {@link y}, {@link item} are required for a valid command.
 */
export interface BuildCmdOptions {
	/**
	 * X-coord, horizontal offset from the **middle** of the left bottom square of the blueprint area. Can go down to `-0.5`.
	 */
	x?: number
	/**
	 * Y-coord, vertical offset from the **middle** of left bottom square of the blueprint area. Can go down to `-0.5`.
	 */
	y?: number
	/** Integer ID of the item to build. */
	item?: number
	/** A {@link BuildBits} instance. */
	bits?: BuildBits
	/** Shape index of the tile to be placed. */
	shape?: number
}

/**
 * All the properties can be set. Set to `undefined` to remove a property, `null` to use {@link ConfigCmd.defaults} during encoding.
 * @example
 * new ConfigCmd() // empty config
 * new ConfigCmd({ loader: null }) // default loader config
 * new ConfigCmd({ loader: { dropPoint: LoaderPoint.BOTTOM } }) // loader config with drop point bottom, rest default
 * cmd.loader.priority = null // change priority of existing loader config to default
 */
export interface ConfigCmdOptions {
	/** What the filter for hatches and loaders should do. */
	filterMode?: FilterMode,
	/** Array of 3 item IDs in integer. */
	filterItems?: [number, number, number],
	/** Used for expando boxes. [0, 360] float. */
	angle?: number,
	/** Used for shield generators. */
	fixedAngle?: FixedAngle,
	/**  */
	pusher?: PusherConfig,
	/**  */
	loader?: LoaderConfig
}

/**
 * All the properties can be set. Set to `undefined` to remove a property, `null` to use {@link ConfigCmd.defaults} during encoding.
 */
export interface LoaderConfig {
	/**  */
	pickupPoint?: LoaderPoint,
	/**  */
	dropPoint?: LoaderPoint,
	/**  */
	priority?: LoaderPriority,
	/**  */
	stackLimit?: number,
	/** [20, 1200] float, in ticks. (1200/20 = 60 seconds cycle time in game) */
	cycleTime?: number,
	/**  */
	requireOutputInventory?: boolean,
	/**  */
	waitForStackLimit?: boolean
}

/**
 * All the properties can be set. Set to `undefined` to remove a property, `null` to use {@link ConfigCmd.defaults} during encoding.
 */
export interface PusherConfig {
	/** Pusher mode when it not hitting an item included in {@link ConfigCmd.filterItems}. */
	defaultMode?: PusherMode,
	/** Pusher mode when it is hitting an item included in {@link ConfigCmd.filterItems}. */
	filteredMode?: PusherMode,
	/** [0, 360] float. */
	angle?: number,
	/** [0, 20] float. */
	targetSpeed?: number,
	/** Whether the filter should *also* check for items in a container that the beam hits. */
	filterByInventory?: boolean,
	/** [0, 1000] float. */
	maxBeamLength?: number
}
