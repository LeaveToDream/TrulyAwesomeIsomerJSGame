class GroundSquare {

  aSize: number;
  bSize: number;
  blocs: GroundBloc[];

  constructor( aSize = 10, bSize = 10 ) {
    var blocs: [GroundBloc];

    for ( var i = 0; i < 2 * aSize; i++ ) {
      blocs.push( new GroundBloc() );
    }

    this.aSize = aSize;
    this.bSize = bSize;
    this.blocs = blocs;
  }

  draw( iso ) {
    var xDelta = ( this.aSize - 1 ) / 2;
    var i = 0;
    for ( var b = this.bSize - 1; b >= 0; b-- ) {
      for ( var a = 0; a < this.aSize; a++ ) {
        this.blocs[i].draw( iso, new Point( a + b - xDelta, b - a + xDelta ) );
        i = ( i + 1 ) % ( 2 * this.aSize );
      }
      if ( b !== 0 ) {
        for ( var a = 1; a < this.aSize; a++ ) {
          var aa = a - 0.5;
          var bb = b - 0.5;

          this.blocs[i].draw( iso, new Point( aa + bb - xDelta, bb - aa + xDelta ) );
          i = ( i + 1 ) % ( 2 * this.aSize );
        }
      }
    }
  }

  /**
   * !!! TODO : Finish those function !!!
   * What is most needed is a function that translate x,y coordinate to a,b
   * bijectivly, depending on the
   */
  drawGrid (iso, gridColor = black) {
    for (var x = 0; x < this.aSize + 1; x++) {
      iso.add(new Path([
        new Point(x, 0, 0),
        new Point(x, this.aSize, 0),
        new Point(x, 0, 0)
      ]), gridColor);
    }
    for (var y = 0; y < this.bSize + 1; y++) {
      iso.add(new Path([
        new Point(0, y, 0),
        new Point(this.bSize, y, 0),
        new Point(0, y, 0)
      ]), gridColor);
    }
  }

  /**
    * TODO : change X & Y to A & B
    * Draw X and Y to know where they are graphicly
    * @param Isomer iso : the layer to display on
    */
    drawAbsisse (iso) {
    // X absisse flag
    iso.add(new Path([Point(this.aSize - 1, 1, 0), Point(this.aSize, 0, 0), Point(this.aSize - 1, 1, 0)]), white);
    iso.add(new Path([Point(this.aSize, 1, 0), Point(this.aSize - 1, 0, 0), Point(this.aSize, 1, 0)]), white);

    // Y absisse flag
    iso.add(new Path([Point(0, this.bSize, 0), Point(0.5, this.bSize - 0.5, 0), Point(0, this.bSize, 0)]), white);
    iso.add(new Path([Point(1, this.bSize, 0), Point(0, this.bSize - 1, 0), Point(1, this.bSize, 0)]), white);
  }

  /**
   * Draw both the grid and X & Y flags
   * @param Isomer iso : the layer to display on
   */
  drawConvenient (iso) {
    this.drawGrid(iso, new Color(10, 160, 0, 1));
    this.drawAbsisse(iso);
  }

}
