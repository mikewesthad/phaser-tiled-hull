class StartState extends Phaser.State {
    create() {
        const g = this.game;

        // Load the map from the Phaser cache
        const tilemap = g.add.tilemap("map-1");

        // Set up the tilesets - first parameter is name of tileset in Tiled and second paramter is
        // name of tileset image in Phaser's cache
        const wallTileset = tilemap.addTilesetImage("tiles", "tiles");

        // Load the named layers - first parameter corresponds to layer name in Tiled
        tilemap.createLayer("bg", g.width, g.height);
        const wallLayer = tilemap.createLayer("walls", g.width, g.height);
        
        // Set all tiles in the wall layer to be colliding
        tilemap.setCollisionBetween(wallTileset.firstgid, wallTileset.firstgid +
            wallTileset.total, true, wallLayer);

        // Method 1: find hull from colliding tiles
        const hulls = phaserTiledHull(wallLayer, {checkCollide: true});

        // Method 2: find hull only using the first row of tiles in tilemap/tiles.png. In this
        // case, that's the white tiles.
        // const indices = [];
        // const firstRowStartIndex = wallTileset.firstgid;
        // const firstRowEndIndex = wallTileset.firstgid + wallTileset.columns;
        // for (let i = firstRowStartIndex; i < firstRowEndIndex; i++) indices.push(i);
        // const hulls = phaserTiledHull(wallLayer, {tileIndices: indices});
        
        // Method 3: find hull using a tile property set up in Tiled - in this case, a property
        // called "checkHull" has been added to the tiles. The pink tiles have a value of true and
        // everything else has a value of false. (To set properties: open tiled, go to the tilesets
        // panel and click the edit tileset button.)
        // const hulls = phaserTiledHull(wallLayer, {tileProperty: "checkHull"});

        // Mixed method: you can combine options. When combining options, a tile only has to pass
        // ONE of the checks in order to end up included in one of the hulls.
        // const hulls = phaserTiledHull(wallLayer, {
        //     tileIndices: [16], // Last tile in the white row 
        //     tileProperty: "checkHull" // All pink tiles
        // });
        
        this._drawHulls(hulls);
    }

    _drawHulls(hulls) {
        const overlay = this.game.add.graphics(0, 0);

        for (const poly of hulls) {
            const polyColor = Phaser.Color.HSLtoRGB(Math.random(), 1, 0.5).color;
            
            for (const edge of poly) {
                // Draw the edge
                overlay.lineStyle(5, polyColor, 1);
                overlay.moveTo(edge.line.start.x, edge.line.start.y);
                overlay.lineTo(edge.line.end.x, edge.line.end.y);

                // Draw the normal at the midpoint of the edge
                const normalStart = edge.midpoint;
                const normalEnd = Phaser.Point.add(
                    normalStart, 
                    edge.normal.setMagnitude(20)
                );
                overlay.lineStyle(1, polyColor, 1);
                overlay.moveTo(normalStart.x, normalStart.y);
                overlay.lineTo(normalEnd.x, normalEnd.y);
            }
        }
    }

}

export default StartState;