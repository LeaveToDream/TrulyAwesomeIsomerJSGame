var Coord = (function () {
    function Coord(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Coord.prototype.sum = function () {
        return this.x + this.y;
    };
    Coord.prototype.getPoint = function () {
        return new Point(this.x, this.y);
    };
    Coord.prototype.getX = function () {
        return this.x;
    };
    Coord.prototype.getY = function () {
        return this.y;
    };
    Coord.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Coord;
}());
