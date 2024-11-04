import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [{
	ignores: ["dist/*", "docs/*"],
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"), {
	plugins: {
		"@typescript-eslint": typescriptEslint
	},

	languageOptions: {
		globals: {
			...globals.node,
			...globals.browser
		},

		parser: tsParser,
		ecmaVersion: 2022,
		sourceType: "module"
	},

	rules: {
		indent: ["error", "tab", {
			SwitchCase: 1
		}],

		quotes: ["error", "double"],
		semi: ["error", "never"],
		"prefer-const": "warn",
		"@typescript-eslint/no-explicit-any": 0
	}
}]
