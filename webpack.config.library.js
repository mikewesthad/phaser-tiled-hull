/* eslint-env node */

const path = require("path");

module.exports = {
    context: path.join(__dirname, "src", "library"),
    entry: {
        "phaser-tiled-hull": "./index.js",
        "phaser-tiled-hull.min": "./index.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        library: "phaserTiledHull",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    devtool: "source-map"
};
