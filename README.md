# Hulls from Tilemaps in Phaser

Documentation and upload in-progress.

A module for reducing neighboring tiles (in a tilemap) into a single shape - a convex hull.

## Why

We needed the ability to find hulls in a tilemap in our 2D lighting engine. This could also be useful for simplifying the collision shapes within a tilemap.

TODO: images showing hull

## Usages

### Through a Script (Global)

`<script src="dist/phaser-tiled-hull.min.js><script>`

```js
phaserTiledHull(...)
```

### Through NPM (Module)

Install the dependency:

`npm install --save phaser-tiled-hull`

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

TODO
