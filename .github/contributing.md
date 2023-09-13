### Issues and Bugs
Create a detailed issue in the [Issues](https://github.com/Blueyescat/dsabp-js/issues) page.

### Suggestions and Questions
Use the [Discussions](https://github.com/Blueyescat/dsabp-js/discussions) page.

## Code Contribution
* Consider asking if your change is wanted before starting to work on it or making a pull request.
* Please try to keep the code clean and follow the existing formatting. Use ESLint.
* **NPM Scripts**
  * `npm start` - Start auto compiling TS files on change. (`dist/tsc/`)
  * `npm run build:dev` - Compile all TS files once. (`dist/tsc/`)
  * `npm run build` - Compile TS files and bundle them. The build script does some special stuff. (`dist/`)
  * `npm run docs` - Generate documentation. (`docs/`)
* Emitted JS files in `dist/tsc/` are for local testing only. Use these in Node with `import {} from "dsabp-js/dev"`.
  * This allows for faster testing. If you need to test outside of Node and ESM, you need to use the other, bundled files.
  * `dist/` other than `/tsc/` are the files that will be published.
* Feel free to contact me on Discord about this. (`@blueyescat`)

### After Finishing Development
1. Test your changes to ensure they work and don't break any existing functionality.
2. Create a [Pull request](https://github.com/Blueyescat/dsabp-js/pulls).
