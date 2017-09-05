/**
 * Alias for rockSalt().
 */
function rS() {
    return salt(0.2);
}
var Rock = (function () {
    /**
     * Generate a rock
     */
    function Rock(color, orientation) {
        if (color === void 0) { color = new Color(80, 80, 80, 1); }
        if (orientation === void 0) { orientation = 0; }
        // Points per level
        // margin & width of base
        var mB = 0.5;
        var wB = 2;
        var mIB = 0.15; // Margin increment for inner points
        var base = [
            Point(mB + mIB + (rS()), mB + mIB + (rS()), 0),
            Point(wB / 2 + rS(), mB + rS(), 0),
            Point(wB - (mB + mIB) + (rS() / 2), (mB + mIB) + (rS() / 2), 0),
            Point(wB - mB + rS(), wB / 2 + rS(), 0),
            Point(wB - (mB + mIB) + (rS() / 2), wB - (mB + mIB) + (rS() / 2), 0),
            Point(wB / 2 + rS(), wB - mB + rS(), 0),
            Point((mB + mIB) + (rS() / 2), wB - (mB + mIB) + (rS() / 2), 0),
            Point(mB + rS(), wB / 2 + rS(), 0)
        ];
        var levelOne = [
            Point((mB + mIB) + (rS() / 2), (mB + mIB) + (rS() / 2), 0.45 + rS()),
            Point(wB / 2 + rS(), mB + rS(), 0.45 + rS()),
            Point(wB - (mB + mIB) + (rS() / 2), (mB + mIB) + (rS() / 2), 0.45 + rS()),
            Point(wB - mB + rS(), wB / 2 + rS(), 0.50 + rS()),
            Point(wB - (mB + mIB) + (rS() / 2), wB - (mB + mIB) + (rS() / 2), 0.55 + rS()),
            Point(wB / 2 + rS(), wB - mB + rS(), 0.55 + rS()),
            Point((mB + mIB) + (rS() / 2), wB - (mB + mIB) + (rS() / 2), 0.50 + rS()),
            Point(mB + rS(), wB / 2 + rS(), 0.45 + rS())
        ];
        /* const levelTwo = [
         Point(wB / 2 + rS(), wB / 2 + rS(), 0.75 + rS() / 2)
        ]; */
        // Paths
        var groundP = [new Path(base)];
        var levelOneP = [];
        var levelTwoP = [new Path(levelOne)];
        var jj;
        for (var j = 0; j < levelOne.length; j++) {
            jj = (j + 1) % levelOne.length;
            levelOneP.push(new Path(base[j], base[jj], levelOne[jj], levelOne[j]));
        }
        var allPaths = [
            groundP,
            levelOneP,
            levelTwoP
        ];
        this.width = wB;
        this.allPaths = allPaths;
        this.rockColor = color;
        this.orientation = orientation;
        this.canvas = new Canvas();
    }
    /**
     * Draw a rock
     * // @param Isomer iso : the layer to display on
     * @param Point origin : botmost point of the display
     * // @param int rotate : angle in radian to rotate the rock on the z axis
     */
    // TODO add orientation support
    // TODO add grass for delimitation
    Rock.prototype.draw = function (origin, drawGrass) {
        if (drawGrass === void 0) { drawGrass = false; }
        var grey = new Color(80, 80, 80, 1);
        var x = origin.x - this.width / 4;
        var y = origin.y - this.width / 4;
        var z = origin.z;
        var iso = this.canvas.iso();
        this.canvas.setIndex(origin.x + origin.y + (2 * z));
        var paths = this.allPaths;
        var part;
        for (var i = 0, lenI = paths.length; i < lenI; i++) {
            for (var j = 0, lenJ = paths[i].length; j < lenJ; j++) {
                part = paths[i][j];
                part = part.rotateZ(Point(this.width / 2, this.width / 2, 0), this.orientation);
                part = part.translate(x, y, z);
                iso.add(part, grey);
            }
        }
    };
    return Rock;
}());
