export const PREFIX = "DSA:"

/** The mode of a pusher config. */
export enum PusherMode {
	PUSH,
	PULL,
	DO_NOTHING
}

/** The pickup or drop point of a loader config. */
export enum LoaderPoint {
	TOP_LEFT,
	TOP,
	TOP_RIGHT,
	LEFT,
	RIGHT,
	BOTTOM_LEFT,
	BOTTOM,
	BOTTOM_RIGHT
}

/** The priority of a loader config. */
export enum LoaderPriority {
	LOW,
	NORMAL,
	HIGH
}

/** The mode of a filter config. */
export enum FilterMode {
	ALLOW_ALL,
	BLOCK_FILTER_ONLY,
	ALLOW_FILTER_ONLY,
	BLOCK_ALL
}

export enum FixedAngle {
	RIGHT,
	UP,
	LEFT,
	DOWN
}
