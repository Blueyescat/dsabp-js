export const enum TAG {
	U8 = 0x80,
	U16 = 0x81,
	U32 = 0x82,
	U64 = 0x83,
	I8 = 0x84,
	I16 = 0x85,
	I32 = 0x86,
	I64 = 0x87,
	F32 = 0x88,
	F64 = 0x89,
	STR_L1 = 0x8A,
	STR_L2 = 0x8B,
	STR_L4 = 0x8C,
	TRUE = 0x8D,
	FALSE = 0x8E,
	NULL = 0x8F,
	ARRAY_BEGIN = 0x90,
	ARRAY_END = 0x91,
	BYTES_L1 = 0x94,
	BYTES_L2 = 0x95,
	BYTES_L4 = 0x96
}

export const enum BlueprintIndex {
	VER,
	WIDTH,
	HEIGHT,
	CMDS
}

export const enum CmdType {
	BUILD,
	CONFIG
}

export const enum CfgMsgKey {
	FILTER_CONFIG = "filter_config",
	FILTER_ITEMS = "filter_items",
	ANGLE = "angle",
	ANGLE_FIXED = "angle_fixed",
	PUSHER = "config_pusher",
	LOADER = "config_loader"
}

export const enum BuildCmdIndex {
	TYPE,
	X,
	Y,
	ITEM,
	BITS,
	SHAPE
}

export const enum ConfigCmdIndex {
	TYPE,
	DATA
}

export const enum PusherCfgIndex {
	DEFAULT_MODE,
	FILTERED_MODE,
	ANGLE,
	TARGET_SPEED,
	FILTER_BY_INVENTORY,
	MAX_BEAM_LENGTH
}

export const enum LoaderCfgIndex {
	PICKUP_POINT,
	DROP_POINT,
	PRIORTY,
	STACK_LIMIT,
	CYCLE_TIME,
	REQUIRE_OUTPUT_INVENTORY,
	WAIT_FOR_STACK_LIMIT
}
