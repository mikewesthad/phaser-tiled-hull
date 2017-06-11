// Fix for webpack not exporting ES6 module default properly when using global mode of UMD. It ends
// up with something having to do "phaserTiledHull.default(...)" instead of "phaserTiledHull(...)"
module.exports = require("./tiled-hull").default;