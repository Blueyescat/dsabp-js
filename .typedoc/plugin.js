import { Comment, Context, Converter, DeclarationReflection, IndexedAccessType, ReflectionFlag, ReflectionKind } from "typedoc"

// These just work, using improper methods. Makes the documentation clearer.

export function load(app) {
	app.converter.on(Converter.EVENT_RESOLVE_BEGIN, (/** @type {Context} */ context) => {
		const reflections = context.project.reflections
		for (const id in reflections) {
			/** @type {DeclarationReflection} */
			const reflection = reflections[id]

			// hide constructors of abstract classes
			if (reflection.kindOf(ReflectionKind.Class) && reflection.flags.isAbstract) {
				const ctor = reflection.getChildByName("constructor")
				ctor.flags.setFlag(ReflectionFlag.Private, true)
			}

			// show classes extending Enum class as an Enum
			if (reflection.extendedTypes?.[0]?.name == "Enum") {
				const clsRef = reflection
				clsRef.kind = ReflectionKind.Enum
				/** @type {DeclarationReflection} */
				const enumValueRef = clsRef.getChildByName("enumValue")

				const ctor = reflection.getChildByName("constructor")
				ctor.flags.setFlag(ReflectionFlag.Private, true)

				if (!clsRef.comment)
					clsRef.comment = new Comment()
				clsRef.comment.summary.push({
					kind: "text",
					text: "\r\n\r\nThis is a class that extends the `Enum` class.",
				})

				for (const cld of reflection.children) {
					if (cld.kind == ReflectionKind.Property && cld.flags.isStatic && cld.type?.name == clsRef.name) {
						cld.kind = ReflectionKind.EnumMember
						cld.flags.setFlag(ReflectionFlag.Static, false)
						cld.defaultValue = null
					} else if (cld.signatures) {
						for (const sig of cld.signatures) {
							if (sig.parameters) {
								sig.parameters = sig.parameters.filter(paraRef => {
									if (paraRef.type instanceof IndexedAccessType && paraRef.type.indexType.value == "enumValue") {
										paraRef.type = enumValueRef.type
									}
									if (paraRef.name == "this") { // hide this parameters
										return false
									}
									return true
								})
							}
							if (sig.typeParameters?.[0]?.name == "CT") {
								sig.typeParameters.splice(0, 1) // hide the type parameter
							}
							if (sig.type) { // show CT as the class
								if (sig.type.name == "CT")
									sig.type._target = clsRef.id
								sig.type.typeArguments?.forEach((typeRef, index) => {
									if (typeRef instanceof IndexedAccessType && typeRef.indexType.value == "enumValue") {
										sig.type.typeArguments[index] = enumValueRef.type
									}
									if (typeRef.name == "CT") {
										typeRef._target = clsRef.id
									}
								})
							}
						}
					}
				}
			}
		}
	})
}
