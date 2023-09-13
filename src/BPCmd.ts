export abstract class BPCmd {
	/**
	 * @returns A new instance with the same properties. (Deep clone)
	 */
	abstract clone()
	/** @private */
	abstract toArray(): any[]
}
