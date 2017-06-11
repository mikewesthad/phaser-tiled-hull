# Hulls from Tilemaps in Phaser

Documentation and upload in-progress.

A module for reducing neighboring tiles (in a tilemap) into a single shape - a convex hull.

## Why

We needed the ability to find hulls in a tilemap in our 2D lighting engine. This could also be useful for simplifying the collision shapes within a tilemap.

TODO: images showing hull

## Usages

### Through a Script (Global)

Download the dist/phaser-tiled-hull.min.js [here](https://raw.githubusercontent.com/mikewesthad/phaser-tiled-hull/master/dist/phaser-tiled-hull.min.js) and include it in your HTML:

```
<script src="dist/phaser-tiled-hull.min.js><script>
```

Inside of your own script, you can now use the global `phaserTiledHull`:

```js
phaserTiledHull(...)
```

### Through NPM (Module)

Install the dependency:

```
npm install --save phaser-tiled-hull
```

To use the babelified and minified library:

```js
import tiledHull from "phaser-tiled-hull";
tiledHull(...)
```

To use the raw es6 library (so you can transpile it to match your own project settings):

```js
import tiledHull from "phaser-tiled-hull/src/phaser-tiled-hull";
tiledHull(...)
```

## Building Source

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
├── dist/                           The transpiled library
	├── phaser-tiled-hull.js        Transpiled
	└── phaser-tiled-hull.minjs     Transpiled and minified
```
