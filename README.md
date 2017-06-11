# Hulls from Tilemaps in Phaser

A module for use with [Phaser](http://phaser.io/) for reducing neighboring tiles in a tilemap into a single shape - a polygon "hull". For example, the demo tilemap (left) is converted into a series of hulls (right, each hull is visualized in a random color). The hulls contain information about the edges - including midpoints, normals and line lengths. See [src/example/js/states/start.js](https://github.com/mikewesthad/phaser-tiled-hull/blob/master/src/example/js/states/start.js) for example usage.

This was built to find hulls for casting dynamic shadows in a 2D lighting engine, but the hull calculation might be useful for simplifying things like collision detection.

<img src="./doc-images/demo.png" style="width: 100%">

(Note: if you are viewing this on GitHub or NPM, you might want to check out the HTML documentation [here](https://www.mikewesthad.com/phaser-tiled-hull/docs/).)

## Usages

Whether you include the library as a script tag or import it as a module, Phaser is a dependency. The library expects Phaser to be in the global scope.

### As a Script

Download the dist/phaser-tiled-hull.min.js [here](https://raw.githubusercontent.com/mikewesthad/phaser-tiled-hull/master/dist/phaser-tiled-hull.min.js) and include it in your HTML:

```
<script src="dist/phaser-tiled-hull.min.js><script>
```

Inside of your own script, you can now use the global `phaserTiledHull`:

```js
phaserTiledHull(...)
```

See [src/example/js/states/start.js](https://github.com/mikewesthad/phaser-tiled-hull/blob/master/src/example/js/states/start.js) for example usage in global mode.

### As a Module

Install the dependency:

```
npm install --save phaser-tiled-hull
```

To use the babelified and minified library:

```js
import phaserTiledHull from "phaser-tiled-hull";
phaserTiledHull(...)
```

To use the raw es6 library (so you can transpile it to match your own project settings):

```js
import phaserTiledHull from "phaser-tiled-hull/src/library";
phaserTiledHull(...)
```

### Example

Setup:

```js
// Assuming:
//  - You've imported phaserTiledHull via one of the methods above.
//  - You've created a Phaser game, loaded a tilemap called "map-1" and loaded a
//    tileset called "tiles"

// Add the cached tilemap
const tilemap = game.add.tilemap("map-1");
// Add the tileset - 1st param is name in Tiled, 2nd param is of image in Phaser's cache
const wallTileset = tilemap.addTilesetImage("tiles", "tiles");
// Load your layers (via layer name from Tiled)
tilemap.createLayer("bg", g.width, g.height);
const wallLayer = tilemap.createLayer("walls", g.width, g.height);
// Set all tiles in the wall layer to be colliding
tilemap.setCollisionBetween(wallTileset.firstgid, wallTileset.firstgid +
    wallTileset.total, true, wallLayer);
```

Examples:

```js
// Method 1: find hull from colliding tiles
const hulls = phaserTiledHull(wallLayer, {checkCollide: true});
// -> hulls is now an array where each hull is represented as an array of PolygonEdges

// Method 2: find hull only using only the first 5 tiles in the tileset
const hulls = phaserTiledHull(wallLayer, {tileIndices: [1, 2, 3, 4, 5]});

// Method 3: find hull using a tile property that was set up in Tiled. To set properties:
// open Tiled, go to the tilesets panel and click the edit tileset button.)
const hulls = phaserTiledHull(wallLayer, {tileProperty: "checkHull"});

// Mixed method: you can combine options. When combining options, a tile only has to pass
// ONE of the checks in order to end up included in one of the hulls.
const hulls = phaserTiledHull(wallLayer, {
    tileIndices: [1],
    tileProperty: "checkHull"
});
```

## To Do

- Publish to npm
- Add Phaser as an external dependency so that it doesn't have to be on the global. Relevant mostly for when Phaser v3 is released.
- hull.js can't handle 1x tile concave gaps. Submit PR to hull.js to fix that. For example:

```
Tilemap:             Hull:

 X X X               X X X
 X          ⟶       X   X
 X X X               X X X

```

## Building the Source Files

See the scripts section of package.json. Main commands:

```
npm run build:all   ⟶   Builds & minifies the library & example
npm run dev         ⟶   Builds the library & example and serves it via browser-sync
```

Directory structure:

```
├── src/
    ├── example/                    ES6 example of how to use the library
    └── phaser-tiled-hull/          ES6 source for the library
├── public/                         The babel transpiled example code
└── dist/                           The transpiled library and source maps
    ├── phaser-tiled-hull.js        Transpiled
    └── phaser-tiled-hull.minjs     Transpiled and minified
```

## Contributors

@mikewesthad, @retwedt