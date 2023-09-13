import { Converter, ReflectionFlag, ReflectionKind } from "typedoc"

// hide constructors of abstract classes
export function load(app) {
	app.converter.on(Converter.EVENT_RESOLVE, (context, reflection) => {
		if (reflection.kindOf(ReflectionKind.Class) && reflection.flags.isAbstract) {
			const ctor = reflection.getChildByName("constructor")
			ctor.flags.setFlag(ReflectionFlag.Private, true)
		}
	})
}
