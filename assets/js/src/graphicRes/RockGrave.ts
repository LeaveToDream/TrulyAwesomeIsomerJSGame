class RockGrave implements Inanimate {

  grassShape;
  grassColor;
  graveShape;
  graveColor;
  orientation:number;
  canvas: Canvas;

  constructor( vertices = 15, orientation = 0 ) {

    // Inner margin. Short name for ease of use
    const j = 0.2;
    // length of the grave on the y absisse
    const deepness = 0.2;

    // Points per level
    const coveringGrass = [
      Point( 0, 0, -0.02 ),
      Point( 1, 0, -0.02 ),
      Point( 1, 1, -0.02 ),
      Point( 0, 1, -0.02 )
    ];
    const grave = [
      Point( j, j, 0 ),
      Point( 1 - j, j, 0 ),
      Point( 1 - j, 1 - j, 0 ),
      Point( j, 1 - j, 0 )
    ];

    const x = j;
    const y = 0.5;
    const radius = ( ( 1 - 2 * j ) / 2 );
    // Clean grave
    /*
    for (i = 0; i < vertices+1; i++) {
      grave.push(new Point(
        x - radius * Math.cos(i * Math.PI / vertices - Math.PI/2),
        y - radius * Math.sin(i * Math.PI / vertices - Math.PI/2),
        0));
    }
    /* */

    // Somewhat strange grave, but looks good
    /* */
    for ( let i = 0; i < vertices; i++ ) {
      grave.push( new Point(
        x - radius * Math.cos( i * 2 * Math.PI / vertices ),
        y - radius * Math.sin( i * 2 * Math.PI / vertices ),
        0 ) );
    }
    /* */

    // Path
    const gravePath = new Path( grave );

    const xCenter = ( ( ( 1 - 2 * j ) / 2 ) ) + deepness / 2;

    // Shape
    let graveShape = Shape.extrude( gravePath, 0.2 );
    graveShape = graveShape.rotateY( Point( 1 - j, 0.5, 0 ), -Math.PI / 2 );
    graveShape = graveShape.translate( -xCenter );

    if ( flipCoin() ) {
      graveShape = graveShape.rotateZ( Point( xCenter, 0.5, 0 ), Math.PI / 2 );
      graveShape = graveShape.translate( j / 2, -j / 2 );
    }

    this.grassShape = Shape.extrude( new Path( coveringGrass ), 0.02 );
    this.grassColor = new Color( 25 + cS(), 205 + cS(), 15 + cS(), 0.8 );
    this.graveShape = graveShape;
    this.graveColor = new Color( 80 + cS(), 80 + cS(), 80 + cS(), 1 );
    this.orientation = orientation;
    this.canvas = new Canvas();
  }

  draw( origin, drawGrass = true ) {
    const x = origin.x;
    const y = origin.y;
    const z = origin.z;

    const iso = this.canvas.iso();
    this.canvas.setIndex(x + y + (2 * z));

    if (drawGrass) {
      const grass = this.grassShape.translate( x, y, z );
      iso.add( grass, this.grassColor );
    }

    const grave = this.graveShape.translate( x, y, z );
    iso.add( grave, this.graveColor );
  }
}
