interface C<T> {
	new(arg: any): T
	maps: any
	getMap: any
	getReverseMap: any
}

/**
 * An alternative to TS Enums. Simple, efficient, and compatible with IntelliSense.
 * 
 * An enum constant is an instance of the derived class. References to instances are stored in maps for fast lookups.
 * The derived class can add static or non-static members to store more data or to have more methods on the enum.
 * A constant must have a "main value" (enumValue) that can be anything (preferably a primitive) and is used with the reverse mapping.
 * Easy to add NoReverseEnum and NoValueEnum if ever needed.
 */

/** @hidden */
export class Enum<V> {
	/** @hidden */
	static readonly maps = new Map<string, [Map<string, Enum<any>>, Map<any, string>]>()

	/**
	 * Enum names to constant instances.
	 * 
	 * Can be used to get the names and values of all constants in this enum.
	 */
	static getMap<CT>(this: C<CT>): Map<string, CT> {
		return this.maps.get(this.name)[0]
	}

	/** Enum values to names. */
	static getReverseMap<CT extends { enumValue: any }>(this: C<CT>): Map<CT["enumValue"], string> {
		return this.maps.get(this.name)[1]
	}

	/**
	 * Returns a constant with the specified name, or undefined if not found. (Case-sensitive)
	 * 
	 * Shortcut to using {@link getMap}.
	 */
	static getByName<CT>(this: C<CT>, name: string): CT | undefined {
		return this.getMap().get(name)
	}

	/**
	 * Returns a constant with the specified value, or undefined if not found.
	 * 
	 * Shortcut to using {@link getReverseMap} and {@link getMap}.
	 */
	static getByValue<CT extends { enumValue: any }>(this: C<CT>, value: CT["enumValue"]): CT | undefined {
		return this.getMap().get(
			this.getReverseMap().get(value)
		)
	}

	/** @hidden */
	static end() {
		this.maps.set(this.name, [new Map(), new Map()])
		const map = this.getMap()
		const reverseMap = this.getReverseMap()
		for (const key in this) {
			const value = this[key]
			if (value instanceof Enum) {
				value.enumName = key
				map.set(key, value)
				reverseMap.set(value.enumValue, key)
			}
		}
	}

	constructor(value: V) {
		this.enumValue = value
	}

	/** The name of the constant, i.e. the member name. */
	enumName: string

	/** The value of the constant. */
	enumValue: V

	/** @returns "Enum.MEMBER" */
	toString() {
		return this.constructor.name + "." + this.enumName
	}
}
