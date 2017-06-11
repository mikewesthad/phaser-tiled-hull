/* eslint-env node */

const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    context: path.join(__dirname, "src", "example"),
    entry: {
        main: "./js/main.js"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: require.resolve("phaser-ce/build/custom/pixi"),
                use: [{
                    loader: "expose-loader",
                    options: "PIXI"
                }]
            },
            {
                test: require.resolve("phaser-ce/build/custom/p2"),
                use: [{
                    loader: "expose-loader",
                    options: "p2"
                }]
            },
            {
                test: require.resolve("phaser-ce/build/custom/phaser-split"),
                use: [{
                    loader: "expose-loader",
                    options: "Phaser"
                }]
            }
        ]
    },
    resolve: {
        alias: {
            "pixi": require.resolve("phaser-ce/build/custom/pixi"),
            "p2": require.resolve("phaser-ce/build/custom/p2"),
            "phaser": require.resolve("phaser-ce/build/custom/phaser-split")
        }
    },
    plugins: [
        new CopyWebpackPlugin(
            [{from: "**/*"}], 
            {ignore: ["js/**/*"]}
        )
    ],
    devtool: "source-map"
};