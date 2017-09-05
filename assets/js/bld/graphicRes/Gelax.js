/* global Point, Path */
var Gelax = (function () {
    function Gelax(color) {
        if (color === void 0) { color = red; }
        // Drawing a gelax
        // margin & width of base
        var mB = 0.1;
        var wB = 1;
        var height = 0.8;
        var levelCount = 3;
        var allPoints = [];
        var h;
        // Points per level
        for (var i_1 = 0; i_1 < levelCount; i_1++) {
            h = height * (i_1 / (levelCount - 1));
            allPoints.push([
                Point(mB, mB, h),
                Point(wB - mB, mB, h),
                Point(wB - mB, wB - mB, h),
                Point(mB, wB - mB, h)
            ]);
        }
        // Paths
        var i, jj;
        var allPaths = [];
        for (i = 0; i < allPoints.length - 1; i++) {
            for (var j = 0; j < 4; j++) {
                jj = (j + 1) % 4;
                allPaths.push(new Path(allPoints[i][j], allPoints[i][jj], allPoints[i + 1][jj], allPoints[i + 1][j]));
            }
        }
        allPaths.push(new Path(allPoints[i][0], allPoints[i][1], allPoints[i][2], allPoints[i][3]));
        this.gelaxPaths = allPaths;
        this.gelaxColor = color;
        this.canvas = new Canvas;
    }
    // TODO add orientation && breathing support
    Gelax.prototype.draw = function (origin, breath) {
        if (breath === void 0) { breath = 0; }
        this.canvas.clear();
        var x = origin.x;
        var y = origin.y;
        var z = origin.z;
        var iso = this.canvas.iso();
        this.canvas.setIndex(x + y + (2 * z));
        this.gelaxColor = new Color(this.gelaxColor.r, this.gelaxColor.g, this.gelaxColor.b, 0.7);
        for (var i = 0; i < this.gelaxPaths.length; i++) {
            iso.add(this.gelaxPaths[i].translate(x, y, z), this.gelaxColor);
        }
    };
    return Gelax;
}());
