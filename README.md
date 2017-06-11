# Hulls from Tilemaps in Phaser

Documentation and upload in-progress.

A module for reducing neighboring tiles (in a tilemap) into a single shape - a polygon "hull".

## Why

We needed the ability to find hulls in a tilemap in our 2D lighting engine. This could also be useful for simplifying the collision shapes within a tilemap.

TODO: images showing hull

## Usages

Whether you use the module via a script or via npm, Phaser is a dependency. The `phaserTiledHull` expects Phaser to be in the global scope.

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

## To Do

- Add Phaser as an external dependency so that it doesn't have to be on the global. Relevant mostly for when Phaser v3 is released.
- hull.js can't handle 1x tile concave gaps. Submit PR to hull.js to fix that. For example:

```
Tilemap:             Hull:

 X X X               X X X
 X          ⟶       X   X
 X X X               X X X

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
└── dist/                           The transpiled library and source maps
    ├── phaser-tiled-hull.js        Transpiled
    └── phaser-tiled-hull.minjs     Transpiled and minified
```
