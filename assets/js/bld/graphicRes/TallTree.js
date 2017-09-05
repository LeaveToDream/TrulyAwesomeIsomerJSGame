var TallTree = (function () {
    function TallTree(orientation) {
        if (orientation === void 0) { orientation = 0; }
        // Preparing a tree
        var h1 = 0.8;
        var h2 = h1 + 0.58;
        var h3 = h2 + 1.0;
        var h4 = h3 + 0.58;
        // Points per level
        var coveringGrass = [
            Point(0, 0, -0.02),
            Point(3, 0, -0.02),
            Point(3, 3, -0.02),
            Point(0, 3, -0.02)
        ];
        var levelOne = [
            Point(1.2, 1.2, h1),
            Point(1.8, 1.2, h1),
            Point(1.8, 1.8, h1),
            Point(1.2, 1.8, h1)
        ];
        var levelTwo = [
            Point(1, 0.4, h2),
            Point(2, 0.4, h2),
            Point(2.6, 1, h2),
            Point(2.6, 2, h2),
            Point(2, 2.6, h2),
            Point(1, 2.6, h2),
            Point(0.4, 2, h2),
            Point(0.4, 1, h2)
        ];
        var levelThree = [
            Point(1, 0.4, h3),
            Point(2, 0.4, h3),
            Point(2.6, 1, h3),
            Point(2.6, 2, h3),
            Point(2, 2.6, h3),
            Point(1, 2.6, h3),
            Point(0.4, 2, h3),
            Point(0.4, 1, h3)
        ];
        var levelFour = [
            Point(1, 1, h4),
            Point(2, 1, h4),
            Point(2, 2, h4),
            Point(1, 2, h4)
        ];
        // Paths
        var allPaths = [
            [new Path(levelOne)],
            [
                new Path(levelOne[0], levelTwo[0], levelTwo[7]),
                new Path(levelOne[1], levelTwo[1], levelTwo[2]),
                new Path(levelOne[2], levelTwo[3], levelTwo[4]),
                new Path(levelOne[3], levelTwo[5], levelTwo[6]),
                // Then rectangles
                new Path(levelOne[0], levelOne[1], levelTwo[1], levelTwo[0]),
                new Path(levelOne[1], levelOne[2], levelTwo[3], levelTwo[2]),
                new Path(levelOne[2], levelOne[3], levelTwo[5], levelTwo[4]),
                new Path(levelOne[3], levelOne[0], levelTwo[7], levelTwo[6])
            ],
            [
                new Path(levelThree[0], levelThree[1], levelTwo[1], levelTwo[0]),
                new Path(levelThree[1], levelThree[2], levelTwo[2], levelTwo[1]),
                new Path(levelThree[2], levelThree[3], levelTwo[3], levelTwo[2]),
                new Path(levelThree[3], levelThree[4], levelTwo[4], levelTwo[3]),
                new Path(levelThree[4], levelThree[5], levelTwo[5], levelTwo[4]),
                new Path(levelThree[5], levelThree[6], levelTwo[6], levelTwo[5]),
                new Path(levelThree[6], levelThree[7], levelTwo[7], levelTwo[6]),
                new Path(levelThree[7], levelThree[0], levelTwo[0], levelTwo[7])
            ],
            [
                new Path(levelFour[0], levelThree[0], levelThree[7]),
                new Path(levelFour[1], levelThree[1], levelThree[2]),
                new Path(levelFour[2], levelThree[3], levelThree[4]),
                new Path(levelFour[3], levelThree[5], levelThree[6]),
                new Path(levelFour[0], levelFour[1], levelThree[1], levelThree[0]),
                new Path(levelFour[1], levelFour[2], levelThree[3], levelThree[2]),
                new Path(levelFour[2], levelFour[3], levelThree[5], levelThree[4]),
                new Path(levelFour[3], levelFour[0], levelThree[7], levelThree[6])
            ],
            [new Path(levelFour)]
        ];
        this.grassShape = Shape.extrude(new Path(coveringGrass), 0.02);
        this.grassColor = new Color(25 + cS(), 205 + cS(), 15 + cS(), 0.8);
        this.troncShape = Shape.Cylinder(Point(1.5, 1.5, 0), 0.3, 25, 0.8);
        this.troncColor = new Color(100 + cS(), 50 + cS(), 25 + cS(), 1);
        this.leafPaths = allPaths;
        this.leafColor = new Color(20 + cS(), 180 + cS(), 40 + cS(), 0.6);
        this.orientation = orientation;
        this.canvas = new Canvas();
    }
    /**
      * Draw a tree
      * // @param Isomer iso : the layer to display on
      * @param Point origin : center point of the display
      * // @param int rotate : angle in radian to rotate the tree on the z axis
      */
    TallTree.prototype.draw = function (origin, drawGrass) {
        if (drawGrass === void 0) { drawGrass = false; }
        var x = origin.x - 1;
        var y = origin.y - 1;
        var z = origin.z;
        var iso = this.canvas.iso();
        this.canvas.setIndex(x + 1 + y + 1 + (2 * z));
        if (drawGrass) {
            var grass = this.grassShape.translate(x, y, z);
            iso.add(grass, this.grassColor);
        }
        var tronc = this.troncShape.translate(x, y, z);
        iso.add(tronc, this.troncColor);
        var i, j, lenI, lenJ, leaf;
        for (i = 0, lenI = this.leafPaths.length; i < lenI; i++) {
            for (j = 0, lenJ = this.leafPaths[i].length; j < lenJ; j++) {
                leaf = this.leafPaths[i][j].rotateZ(Point(1.5, 1.5, 0), this.orientation);
                iso.add((leaf.translate(x, y, z)), this.leafColor);
            }
        }
    };
    return TallTree;
}());
