class Ground {

  xSize: number;
  ySize: number;
  blocs: GroundBloc[];
  groundLayer: Canvas;

  constructor(xSize = 10, ySize = 10) {
    var blocs: GroundBloc[] = [];

    for (var x = 0; x < xSize + 1; x++) {
      for (var y = 0; y < ySize + 1; y++) {
        blocs.push(new GroundBloc());
      }
    }
    this.xSize = xSize;
    this.ySize = ySize;
    this.blocs = blocs;

    this.groundLayer = new Canvas(71);
  }



  /**
    * Draw the ground, composed of multiple GroundBloc.
    * // @param Isomer iso : the layer to display on
    */
  drawBlocs() {
    for (var x = this.xSize - 1; x >= 0; x--) {
      for (var y = this.ySize - 1; y >= 0; y--) {
        this.blocs[x + y * x].draw(this.groundLayer.iso(), new Point(x, y));
      }
    }
  }

  /**
   * Draw a grid
   * // @param Isomer iso : the layer to display on
   * @param int xSize, int ySize : nb of line/column to display
   * @param Color gridColor : color of the grid
   */
  drawGrid(gridColor = black) {
    let iso = this.groundLayer.iso();
    for (var x = 0; x < this.xSize + 1; x++) {
      iso.add(new Path([
        new Point(x, 0, 0),
        new Point(x, this.xSize, 0),
        new Point(x, 0, 0)
      ]), gridColor);
    }
    for (var y = 0; y < this.ySize + 1; y++) {
      iso.add(new Path([
        new Point(0, y, 0),
        new Point(this.ySize, y, 0),
        new Point(0, y, 0)
      ]), gridColor);
    }
  }

  /**
    * Draw X and Y to know where they are graphicly
    * // @param Isomer iso : the layer to display on
    */
  drawAbsisse() {
    let iso = this.groundLayer.iso();
    // X absisse flag
    iso.add(new Path([Point(this.xSize - 1, 1, 0), Point(this.xSize, 0, 0), Point(this.xSize - 1, 1, 0)]), white);
    iso.add(new Path([Point(this.xSize, 1, 0), Point(this.xSize - 1, 0, 0), Point(this.xSize, 1, 0)]), white);

    // Y absisse flag
    iso.add(new Path([Point(0, this.ySize, 0), Point(0.5, this.ySize - 0.5, 0), Point(0, this.ySize, 0)]), white);
    iso.add(new Path([Point(1, this.ySize, 0), Point(0, this.ySize - 1, 0), Point(1, this.ySize, 0)]), white);
  }

  /**
   * Draw both the grid and X & Y flags
   * // @param Isomer iso : the layer to display on
   */
  drawConvenients() {
    this.drawGrid(new Color(10, 160, 0, 1));
    this.drawAbsisse();
  }

  draw() {
    this.drawBlocs();
    this.drawConvenients();
  }

}
