(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["phaserTiledHull"] = factory();
	else
		root["phaserTiledHull"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hull_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hull_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hull_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polygon_edge__ = __webpack_require__(2);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Phaser tiled hull module
 * @module phaser-tiled-hull
 */

 // JS extension required


/**
 * A function to take a tilemap layer and process its tiles into clusters. This returns an array of
 * polygons - each polygon encloses a separate cluster of tiles in the tilemap layer.
 *
 * @param {Phaser.TilemapLayer} tilemapLayer The tilemap layer to use for hull calculation.
 * @param {object} [options = {}] Options for filtering the tiles and only allowing certain tiles to
 * be added to the final hulls. If no options specified, then all tiles in the layer will be
 * processed and added to a hull. If multiple options are specified, then a tile only has to match
 * ONE of the options to be added to a hull.
 * @param {number[]} [options.tileIndices = null] An array of tile indices to use for determining
 * which tiles should be clustered together. If a tile's index matches an index in the array, it
 * will be added to a hull.
 * @param {string} [options.tileProperty = null] The name of a property on tiles (set in Tiled) to
 * use for determining which tiles should be clustered together. If the property is true (or truthy)
 * on a tile, it will be added to a hull.
 * @param {boolean} [options.checkCollide = false] Whether or not a tile's collide property should
 * be used for determining which tiles should be clustered together. If true, then colliding tiles
 * will be added to a hull.
 * @returns {Array.<PolygonEdge[]>} An array where each element represents a polygon. The polygons
 * are stored as an array of PolygonEdge instances.
 */
function phaserTiledHull(tilemapLayer) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$tileIndices = _ref.tileIndices,
        tileIndices = _ref$tileIndices === undefined ? null : _ref$tileIndices,
        _ref$tileProperty = _ref.tileProperty,
        tileProperty = _ref$tileProperty === undefined ? null : _ref$tileProperty,
        _ref$checkCollide = _ref.checkCollide,
        checkCollide = _ref$checkCollide === undefined ? false : _ref$checkCollide;

    // Separate the tilemap layer into an array of clustered tiles
    var clusters = calculateClusters(tilemapLayer, tileIndices, tileProperty, checkCollide);
    // Take the clustered tiles and calculate a hull for each cluster
    var pointHulls = calculateHullPoints(clusters);
    // Take the point hulls and turn them into polygon representations (i.e. connect the dots)
    var polyHulls = buildPolygons(pointHulls);
    // Turn the lines in polyHulls into PolygonEdge instances, pre-caching some helpful info like
    // the edge normals
    var hulls = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = polyHulls.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref2 = _step.value;

            var _ref3 = _slicedToArray(_ref2, 2);

            var i = _ref3[0];
            var polyHull = _ref3[1];

            var hull = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = polyHull[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var edge = _step2.value;

                    hull.push(new __WEBPACK_IMPORTED_MODULE_1__polygon_edge__["a" /* default */](edge, i));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            hulls.push(hull);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return hulls;
}

function calculateClusters(tilemapLayer, tileIndices, tileProperty, checkCollide) {
    var tilemap = tilemapLayer.map;
    var clusters = [];
    var getTile = function getTile(tx, ty) {
        return tilemap.getTile(tx, ty, tilemapLayer.index);
    };

    // Loop over all tiles in the map and kick off recursive cluster building
    for (var x = 0; x < tilemap.width; x++) {
        for (var y = 0; y < tilemap.height; y++) {
            var tile = getTile(x, y);
            if (checkTile(tile) && !findTileInClusters(tile)) {
                var cluster = [];
                recursivelySearchNeighbors(x, y, cluster);
                clusters.push(cluster);
            }
        }
    }

    // Check to make sure the tile passes the checks, i.e. it is allowed to be in a cluster
    function checkTile(tile) {
        // No tile, ignore
        if (!tile) return false;
        // If an array of indices was provided, tile's index must be in that array
        if (tileIndices && tileIndices.includes(tile.index)) return true;
        // If a tile property was provided, the tile must have a truthy value for that property
        if (tileProperty && tile.properties[tileProperty]) return true;
        // If we only care about colliding tiles, make sure the tile collides
        if (checkCollide && tile.collides) return true;
        // Tile didn't pass any checks, ignore
        return false;
    }

    function recursivelySearchNeighbors(x, y, cluster) {
        // If tile passes the checks and is not already in the cluster, add it and recursively check
        // the neighbors. Note: There's no chance of a tile being a member of two separate clusters.
        var tile = getTile(x, y);
        if (checkTile(tile) && cluster.indexOf(tile) === -1) {
            cluster.push(tile); // Add the current tile
            // Search the neighbors
            recursivelySearchNeighbors(x, y - 1, cluster);
            recursivelySearchNeighbors(x, y + 1, cluster);
            recursivelySearchNeighbors(x + 1, y, cluster);
            recursivelySearchNeighbors(x - 1, y, cluster);
        }
    }

    function findTileInClusters(searchTile) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = clusters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _cluster = _step3.value;
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = _cluster[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _tile = _step4.value;

                        if (searchTile === _tile) return _cluster;
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return null;
    }

    return clusters;
}

function calculateHullPoints(clusters) {
    var hulls = [];

    // Loop over each cluster of tiles in clusters and calculate a polygon hull
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = clusters[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var cluster = _step5.value;

            // Find all the points - i.e. the corners of each tile in the cluster
            var points = [];
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = cluster[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var tile = _step6.value;

                    points.push([tile.left, tile.top], [tile.right, tile.top], [tile.left, tile.bottom], [tile.right, tile.bottom]);
                }

                // Use hull.js to find a hull (e.g. points in clockwise order). The second parameter is the 
                // concavity of the hull, with 1 being maximally concave.  
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            var hull = __WEBPACK_IMPORTED_MODULE_0_hull_js___default()(points, 1);
            hulls.push(hull);
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }

    return hulls;
}

function buildPolygons(hulls) {
    var polygons = [];

    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = hulls[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var hullPoints = _step7.value;

            var edges = [];

            // Walk along the line segments of the hull, collapsing collinear lines into a single edge
            var currentEdge = new (Function.prototype.bind.apply(Phaser.Line, [null].concat(_toConsumableArray(hullPoints[0]), _toConsumableArray(hullPoints[1]))))();
            var segment = void 0;
            for (var i = 1; i < hullPoints.length; i++) {
                // Get the next line segment - starts from the endpoint of the last segment
                segment = new (Function.prototype.bind.apply(Phaser.Line, [null].concat(_toConsumableArray(hullPoints[i - 1]), _toConsumableArray(hullPoints[i]))))();

                if (checkIfCollinear(currentEdge, segment)) {
                    // If the current edge and line segment are collinear, then we haven't reached the
                    // end of the edge yet. Extend the edge to contain the segment.
                    currentEdge = new Phaser.Line(currentEdge.start.x, currentEdge.start.y, segment.end.x, segment.end.y);
                } else {
                    // We've reached a corner, so the edge is done. Save it and start a new one.
                    edges.push(currentEdge);
                    currentEdge = segment.clone();
                }
            }

            // Process the last line segment - connecting the last point back around to the first point
            segment = new (Function.prototype.bind.apply(Phaser.Line, [null].concat(_toConsumableArray(hullPoints[hullPoints.length - 1]), _toConsumableArray(hullPoints[0]))))();
            if (checkIfCollinear(currentEdge, segment)) {
                // Extend the edge and add it (since it wasn't added by the loop above)
                currentEdge = new Phaser.Line(currentEdge.start.x, currentEdge.start.y, segment.end.x, segment.end.y);
                edges.push(currentEdge);
            } else {
                // Corner - add the edge and the next segment 
                edges.push(currentEdge);
                edges.push(segment);
            }

            // Determine whether the last edge and the first edge need to be merged (if the points in
            // the hull started midway through an edge)
            if (checkIfCollinear(edges[0], edges[edges.length - 1])) {
                var firstLine = edges.shift();
                var lastLine = edges.pop();
                var combinedLine = new Phaser.Line(firstLine.start.x, firstLine.start.y, lastLine.end.x, lastLine.end.y);
                edges.push(combinedLine);
            }

            // Add the final lines to the polygon
            polygons.push(edges);
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    return polygons;
}

function checkIfCollinear(line1, line2) {
    // To check if two slopes are equal:
    //  lineDeltaY / lineDeltaX = segmentDeltaY / segmentDeltaX
    // But to avoid dividing by zero:
    //  (lineDeltaX * segmentDeltaY) - (lineDeltaY * segmentDeltaX) = 0
    var dx1 = line1.end.x - line1.start.x;
    var dy1 = line1.end.y - line1.start.y;
    var dx2 = line2.end.x - line2.start.x;
    var dy2 = line2.end.y - line2.start.y;
    return dx1 * dy2 - dy1 * dx2 === 0;
}

/* harmony default export */ __webpack_exports__["default"] = (phaserTiledHull);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Fix for webpack not exporting ES6 module default properly when using global mode of UMD. It ends
// up with something having to do "phaserTiledHull.default(...)" instead of "phaserTiledHull(...)"
module.exports = __webpack_require__(0).default;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Small class for precomuting some useful information about an edge of a polygon - the line,
 * length, midpoint, normal. This class isn't exposed directly by the module, but is used in the
 * return type of {@link module:phaser-tiled-hull~phaserTiledHull}.
 *
 * @class PolygonEdge
 */
var PolygonEdge = function () {
  function PolygonEdge(line, hullIndex) {
    _classCallCheck(this, PolygonEdge);

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

  _createClass(PolygonEdge, [{
    key: "_getOutwardNormal",
    value: function _getOutwardNormal(line) {
      // The wall lines are returned from hull.js in clockwise order, so the outward facing normal
      // is the following
      return new Phaser.Point(line.end.y - line.start.y, -(line.end.x - line.start.x)).setMagnitude(1);
    }
  }]);

  return PolygonEdge;
}();

/* harmony default export */ __webpack_exports__["a"] = (PolygonEdge);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function _upperTangent(pointset) {
    var lower = [];
    for (var l = 0; l < pointset.length; l++) {
        while (lower.length >= 2 && (_cross(lower[lower.length - 2], lower[lower.length - 1], pointset[l]) <= 0)) {
            lower.pop();
        }
        lower.push(pointset[l]);
    }
    lower.pop();
    return lower;
}

function _lowerTangent(pointset) {
    var reversed = pointset.reverse(),
        upper = [];
    for (var u = 0; u < reversed.length; u++) {
        while (upper.length >= 2 && (_cross(upper[upper.length - 2], upper[upper.length - 1], reversed[u]) <= 0)) {
            upper.pop();
        }
        upper.push(reversed[u]);
    }
    upper.pop();
    return upper;
}

// pointset has to be sorted by X
function convex(pointset) {
    var convex,
        upper = _upperTangent(pointset),
        lower = _lowerTangent(pointset);
    convex = lower.concat(upper);
    convex.push(pointset[0]);  
    return convex;  
}

module.exports = convex;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {

    toXy: function(pointset, format) {
        if (format === undefined) {
            return pointset.slice();
        }
        return pointset.map(function(pt) {
            /*jslint evil: true */
            var _getXY = new Function('pt', 'return [pt' + format[0] + ',' + 'pt' + format[1] + '];');
            return _getXY(pt);
        });
    },

    fromXy: function(pointset, format) {
        if (format === undefined) {
            return pointset.slice();
        }
        return pointset.map(function(pt) {
            /*jslint evil: true */
            var _getObj = new Function('pt', 'var o = {}; o' + format[0] + '= pt[0]; o' + format[1] + '= pt[1]; return o;');
            return _getObj(pt);
        });
    }

}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function Grid(points, cellSize) {
    this._cells = [];
    this._cellSize = cellSize;

    points.forEach(function(point) {
        var cellXY = this.point2CellXY(point),
            x = cellXY[0],
            y = cellXY[1];
        if (this._cells[x] === undefined) {
            this._cells[x] = [];
        }
        if (this._cells[x][y] === undefined) {
            this._cells[x][y] = [];
        }
        this._cells[x][y].push(point);
    }, this);
}

Grid.prototype = {
    cellPoints: function(x, y) { // (Number, Number) -> Array
        return (this._cells[x] !== undefined && this._cells[x][y] !== undefined) ? this._cells[x][y] : [];
    },

    rangePoints: function(bbox) { // (Array) -> Array
        var tlCellXY = this.point2CellXY([bbox[0], bbox[1]]),
            brCellXY = this.point2CellXY([bbox[2], bbox[3]]),
            points = [];

        for (var x = tlCellXY[0]; x <= brCellXY[0]; x++) {
            for (var y = tlCellXY[1]; y <= brCellXY[1]; y++) {
                points = points.concat(this.cellPoints(x, y));
            }
        }

        return points;
    },

    removePoint: function(point) { // (Array) -> Array
        var cellXY = this.point2CellXY(point),
            cell = this._cells[cellXY[0]][cellXY[1]],
            pointIdxInCell;
        
        for (var i = 0; i < cell.length; i++) {
            if (cell[i][0] === point[0] && cell[i][1] === point[1]) {
                pointIdxInCell = i;
                break;
            }
        }

        cell.splice(pointIdxInCell, 1);

        return cell;
    },

    point2CellXY: function(point) { // (Array) -> Array
        var x = parseInt(point[0] / this._cellSize),
            y = parseInt(point[1] / this._cellSize);
        return [x, y];
    },

    extendBbox: function(bbox, scaleFactor) { // (Array, Number) -> Array
        return [
            bbox[0] - (scaleFactor * this._cellSize),
            bbox[1] - (scaleFactor * this._cellSize),
            bbox[2] + (scaleFactor * this._cellSize),
            bbox[3] + (scaleFactor * this._cellSize)
        ];
    }
};

function grid(points, cellSize) {
    return new Grid(points, cellSize);
}

module.exports = grid;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 (c) 2014-2016, Andrii Heonia
 Hull.js, a JavaScript library for concave hull generation by set of points.
 https://github.com/AndriiHeonia/hull
*/



var intersect = __webpack_require__(7);
var grid = __webpack_require__(5);
var formatUtil = __webpack_require__(4);
var convexHull = __webpack_require__(3);

function _filterDuplicates(pointset) {
    return pointset.filter(function(el, idx, arr) {
        var prevEl = arr[idx - 1];
        return idx === 0 || !(prevEl[0] === el[0] && prevEl[1] === el[1]);
    });
}

function _sortByX(pointset) {
    return pointset.sort(function(a, b) {
        if (a[0] == b[0]) {
            return a[1] - b[1];
        } else {
            return a[0] - b[0];
        }
    });
}

function _sqLength(a, b) {
    return Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2);
}

function _cos(o, a, b) {
    var aShifted = [a[0] - o[0], a[1] - o[1]],
        bShifted = [b[0] - o[0], b[1] - o[1]],
        sqALen = _sqLength(o, a),
        sqBLen = _sqLength(o, b),
        dot = aShifted[0] * bShifted[0] + aShifted[1] * bShifted[1];

    return dot / Math.sqrt(sqALen * sqBLen);
}

function _intersect(segment, pointset) {
    for (var i = 0; i < pointset.length - 1; i++) {
        var seg = [pointset[i], pointset[i + 1]];
        if (segment[0][0] === seg[0][0] && segment[0][1] === seg[0][1] ||
            segment[0][0] === seg[1][0] && segment[0][1] === seg[1][1]) {
            continue;
        }
        if (intersect(segment, seg)) {
            return true;
        }
    }
    return false;
}

function _occupiedArea(pointset) {
    var minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    for (var i = pointset.length - 1; i >= 0; i--) {
        if (pointset[i][0] < minX) {
            minX = pointset[i][0];
        }
        if (pointset[i][1] < minY) {
            minY = pointset[i][1];
        }
        if (pointset[i][0] > maxX) {
            maxX = pointset[i][0];
        }
        if (pointset[i][1] > maxY) {
            maxY = pointset[i][1];
        }
    }

    return [
        maxX - minX, // width
        maxY - minY  // height
    ];
}

function _bBoxAround(edge) {
    return [
        Math.min(edge[0][0], edge[1][0]), // left
        Math.min(edge[0][1], edge[1][1]), // top
        Math.max(edge[0][0], edge[1][0]), // right
        Math.max(edge[0][1], edge[1][1])  // bottom
    ];
}

function _midPoint(edge, innerPoints, convex) {
    var point = null,
        angle1Cos = MAX_CONCAVE_ANGLE_COS,
        angle2Cos = MAX_CONCAVE_ANGLE_COS,
        a1Cos, a2Cos;

    for (var i = 0; i < innerPoints.length; i++) {
        a1Cos = _cos(edge[0], edge[1], innerPoints[i]);
        a2Cos = _cos(edge[1], edge[0], innerPoints[i]);

        if (a1Cos > angle1Cos && a2Cos > angle2Cos &&
            !_intersect([edge[0], innerPoints[i]], convex) &&
            !_intersect([edge[1], innerPoints[i]], convex)) {

            angle1Cos = a1Cos;
            angle2Cos = a2Cos;
            point = innerPoints[i];
        }
    }

    return point;
}

function _concave(convex, maxSqEdgeLen, maxSearchArea, grid, edgeSkipList) {
    var edge,
        keyInSkipList,
        scaleFactor,
        midPoint,
        bBoxAround,
        bBoxWidth,
        bBoxHeight,
        midPointInserted = false;

    for (var i = 0; i < convex.length - 1; i++) {
        edge = [convex[i], convex[i + 1]];
        keyInSkipList = edge[0].join() + ',' + edge[1].join();

        if (_sqLength(edge[0], edge[1]) < maxSqEdgeLen ||
            edgeSkipList[keyInSkipList] === true) { continue; }

        scaleFactor = 0;
        bBoxAround = _bBoxAround(edge);
        do {
            bBoxAround = grid.extendBbox(bBoxAround, scaleFactor);
            bBoxWidth = bBoxAround[2] - bBoxAround[0];
            bBoxHeight = bBoxAround[3] - bBoxAround[1];

            midPoint = _midPoint(edge, grid.rangePoints(bBoxAround), convex);            
            scaleFactor++;
        }  while (midPoint === null && (maxSearchArea[0] > bBoxWidth || maxSearchArea[1] > bBoxHeight));

        if (bBoxWidth >= maxSearchArea[0] && bBoxHeight >= maxSearchArea[1]) {
            edgeSkipList[keyInSkipList] = true;
        }

        if (midPoint !== null) {
            convex.splice(i + 1, 0, midPoint);
            grid.removePoint(midPoint);
            midPointInserted = true;
        }
    }

    if (midPointInserted) {
        return _concave(convex, maxSqEdgeLen, maxSearchArea, grid, edgeSkipList);
    }

    return convex;
}

function hull(pointset, concavity, format) {
    var convex,
        concave,
        innerPoints,
        occupiedArea,
        maxSearchArea,
        cellSize,
        points,
        maxEdgeLen = concavity || 20;

    if (pointset.length < 4) {
        return pointset.slice();
    }

    points = _filterDuplicates(_sortByX(formatUtil.toXy(pointset, format)));

    occupiedArea = _occupiedArea(points);
    maxSearchArea = [
        occupiedArea[0] * MAX_SEARCH_BBOX_SIZE_PERCENT,
        occupiedArea[1] * MAX_SEARCH_BBOX_SIZE_PERCENT
    ];

    convex = convexHull(points);
    innerPoints = points.filter(function(pt) {
        return convex.indexOf(pt) < 0;
    });

    cellSize = Math.ceil(1 / (points.length / (occupiedArea[0] * occupiedArea[1])));

    concave = _concave(
        convex, Math.pow(maxEdgeLen, 2),
        maxSearchArea, grid(innerPoints, cellSize), {});
 
    return formatUtil.fromXy(concave, format);
}

var MAX_CONCAVE_ANGLE_COS = Math.cos(90 / (180 / Math.PI)); // angle = 90 deg
var MAX_SEARCH_BBOX_SIZE_PERCENT = 0.6;

module.exports = hull;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function ccw(x1, y1, x2, y2, x3, y3) {           
    var cw = ((y3 - y1) * (x2 - x1)) - ((y2 - y1) * (x3 - x1));
    return cw > 0 ? true : cw < 0 ? false : true; // colinear
}

function intersect(seg1, seg2) {
  var x1 = seg1[0][0], y1 = seg1[0][1],
      x2 = seg1[1][0], y2 = seg1[1][1],
      x3 = seg2[0][0], y3 = seg2[0][1],
      x4 = seg2[1][0], y4 = seg2[1][1];

    return ccw(x1, y1, x3, y3, x4, y4) !== ccw(x2, y2, x3, y3, x4, y4) && ccw(x1, y1, x2, y2, x3, y3) !== ccw(x1, y1, x2, y2, x4, y4);
}

module.exports = intersect;

/***/ })
/******/ ]);
});
//# sourceMappingURL=phaser-tiled-hull.js.map