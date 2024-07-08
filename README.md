# dsabp-js
[![NPM version](https://img.shields.io/npm/v/dsabp-js)](https://www.npmjs.com/package/dsabp-js) [![NPM downloads](https://img.shields.io/npm/dt/dsabp-js?logo=npm)](https://www.npmjs.com/package/dsabp-js) [![GitHub repository](https://img.shields.io/static/v1?logo=github&label=GitHub&message=repo&color=informational)](https://github.com/Blueyescat/dsabp-js) [![Documentation](https://img.shields.io/static/v1?logo=typescript&label=&message=docs&color=gray&logoColor=white)](https://blueyescat.github.io/dsabp-js/modules)

A TypeScript library to decode, create, modify and encode blueprints for the [Deep Space Airships (DSA)](https://drednot.io) game.
- It works in Node.js and the browser. Not meant to support *older* Node.js versions or browsers.
- The API design is subject to frequent changes for the time being.
- Follows the official [blueprint specification](https://drednot.io/c/coder-docs/t/blueprint-specification).
- Encoded blueprint values aren't forced to be valid in the game. (Allows experimenting)
- The generated blueprint strings won't be identical to what the game generates and may be shorter or longer.
- In Node.js, the built-in [zlib](https://nodejs.org/api/zlib.html) module is used for  deflate and inflate operations, and the [Buffer](https://nodejs.org/api/buffer.html) class is used for Base64 operations. In the browser, the [fflate](https://github.com/101arrowz/fflate) library (8.3KB) and the [atob-btoa](https://github.com/Blueyescat/dsabp-js/blob/main/src/injBrowser.ts) functions are used. The [Compression Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API) is not used for a few reasons.

## Install
#### Node.js
- `npm install dsabp-js` &nbsp;or&nbsp; `yarn add dsabp-js`

#### Browser
- Get the files you need from `/dist` in the package: https://registry.npmjs.org/dsabp-js/-/dsabp-js-0.4.7.tgz<!--@build_tarball-->
- Or use a CDN:
  - https://cdn.jsdelivr.net/npm/dsabp-js/
  - https://unpkg.com/browse/dsabp-js/

## Import
```js
// node
import { decode, encode } from "dsabp-js"
import * as dsabp from "dsabp-js"

const { decode, encode } = require("dsabp-js")
const dsabp = require("dsabp-js")

// browser
import { decode, encode } from "https://cdn.jsdelivr.net/npm/dsabp-js@latest/dist/browser/esm/index.js"
// put the .d.ts file next to .js for better IntelliSense
import * as dsabp from "lib/dsabp-js/index.js"

// the global name for the IIFE build is "dsabp"
<script src="https://unpkg.com/dsabp-js@latest/dist/browser/iife/index.min.js"></script>
const { decode, encode } = dsabp
```
<sup>See the docs for all exports.</sup>

### Browser Extensions
There are some requirements when loading the library using a browser extension's [content_scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts), which has to use the IIFE bundle:
* The JS file must be included in the [web_accessible_resources](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/web_accessible_resources).
* The JS file must be in a folder containing `dsabp` in its name, or the file must be named `dsabp.js` or `dsabp.min.js`. Some examples: `/lib/dsabp/index.js`, `/dsabp.min.js` and `/lib/dsabp.js`.

If you load it using methods such as `import()` (ESM) from a content script or by injecting a `script` tag (ESM or IIFE) into the page, it will work without any requirements.

## Usage
* [Documentation](https://blueyescat.github.io/dsabp-js/modules)
* [DSA Tools](https://dsa.fr.to) uses dsabp-js for the blueprint related stuff.
* **A Simple Example**
  ```js
  import { decode, BuildCmd, Item, encode } from "dsabp-js"

  const bp = await decode("DSA:m8DAxDRhAgMDY8OLiRMYGBkaXk6cOBEA") // decode a blueprint string

  for (const cmd of bp.commands) { // loop all commands of the bp
    if (!(cmd instanceof BuildCmd)) continue // ignore if the cmd is not a BuildCmd

    if (cmd.item == Item.BLOCK) // if the build item is iron block
      cmd.item = Item.BLOCK_ICE_GLASS // replace it with ice block
  }

  console.log("DSA:" + await encode(bp)) // log string for the modified bp
  ```

## Issues / Bugs
Create a detailed issue in the [Issues](https://github.com/Blueyescat/dsabp-js/issues) page.

## Suggestions and Questions
Use the [Discussions](https://github.com/Blueyescat/dsabp-js/discussions) page.

## Code Contribution
See the [contributing guidelines](https://github.com/Blueyescat/dsabp-js/blob/main/.github/contributing.md).
