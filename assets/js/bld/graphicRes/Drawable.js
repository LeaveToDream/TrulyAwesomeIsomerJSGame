var Decor = (function () {
    function Decor(texture, coordinate) {
        this.texture = texture;
        this.coordinate = coordinate;
    }
    Decor.prototype.draw = function () {
        this.texture.draw(this.coordinate.getPoint());
    };
    return Decor;
}());
