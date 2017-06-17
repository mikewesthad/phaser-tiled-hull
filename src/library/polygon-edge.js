/**
 * Small class for precomuting some useful information about an edge of a polygon - the line,
 * length, midpoint, normal. This class isn't exposed directly by the module, but is used in the
 * return type of {@link phaserTiledHull}.
 */
export default class PolygonEdge {
    constructor(line, hullIndex) {
        /**
         * The line that makes up the edge
         * @type {Phaser.Line}
         */
        this.line = line;

        /** @type {number} */
        this.length = line.length;

        /** @type {Phaser.Point} */
        this.midpoint = line.midPoint();
        
        /** 
         * Outward-facing normal vector as a point, normalized to unit length
         * @type {Phaser.Point} 
         * */
        this.normal = this._getOutwardNormal(line);

        /**
         * Identifies which hull index this edge is a part of 
         * @type {number} 
         * */
        this.shapeId = hullIndex;
    }

    _getOutwardNormal(line) {
        // The wall lines are returned from hull.js in clockwise order, so the outward facing normal
        // is the following
        return new Phaser.Point((line.end.y - line.start.y), -(line.end.x - line.start.x))
            .setMagnitude(1);
    }
}