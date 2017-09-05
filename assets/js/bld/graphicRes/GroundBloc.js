var GroundBloc = (function () {
    /**
      * Generate a generic ground bloc, containing ground and grass
      */
    function GroundBloc() {
        this.ground = Shape.Prism(new Point(0, 0, -1), 1, 1, 0.98);
        this.groundColor = new Color(120 + cS(), 63 + cS(), 13 + cS(), 0.95);
        this.grass = Shape.Prism(new Point(0, 0, -0.02), 1, 1, 0.02);
        this.grassColor = new Color(25 + cS(), 205 + cS(), 15 + cS(), 0.8);
    }
    /**
      * Draw the ground bloc.
      * @param Isomer iso : the layer to display on
      * @param Point origin : botmost point of the display
      */
    GroundBloc.prototype.draw = function (iso, origin) {
        var x = origin.x;
        var y = origin.y;
        iso.add(this.ground.translate(x, y), this.groundColor);
        iso.add(this.grass.translate(x, y), this.grassColor);
    };
    return GroundBloc;
}());
