/* global salt, Point, Path, Color, cS */

/**
  * Alias for poolSalt().
  */
function pS() {
  return salt( 0.4 );
}

class Pool implements Inanimate {

  grassShape;
  grassColor;
  marginShape;
  marginColor;
  poolShape;
  poolColor;
  orientation:number;
  canvas:Canvas;

  constructor(orientation=0) {
    // Points per level
    const coveringGrass = [
      Point( 0, 0, 0 ),
      Point( 3, 0, 0 ),
      Point( 3, 4, 0 ),
      Point( 0, 4, 0 )
    ];
    const innerPool = [
      Point( 1 + pS(), 0.5 + pS(), 0 ),
      Point( 2 + pS(), 0.5 + pS(), 0 ),
      Point( 2.5 + pS(), 1 + pS(), 0 ),
      Point( 2.5 + pS(), 3 + pS(), 0 ),
      Point( 2 + pS(), 3.5 + pS(), 0 ),
      Point( 1 + pS(), 3.5 + pS(), 0 ),
      Point( 0.5 + pS(), 3 + pS(), 0 ),
      Point( 0.5 + pS(), 1 + pS(), 0 )
    ];
    const grassMargin = 0.15;
    const iP = innerPool;
    const gM = grassMargin;
    const outerPool = [
      Point( iP[0].x - gM, iP[0].y - gM, 0 ),
      Point( iP[1].x + gM, iP[1].y - gM, 0 ),
      Point( iP[2].x + gM, iP[2].y - gM, 0 ),
      Point( iP[3].x + gM, iP[3].y + gM, 0 ),
      Point( iP[4].x + gM, iP[4].y + gM, 0 ),
      Point( iP[5].x - gM, iP[5].y + gM, 0 ),
      Point( iP[6].x - gM, iP[6].y + gM, 0 ),
      Point( iP[7].x - gM, iP[7].y - gM, 0 )
    ];

    this.grassShape = new Path( coveringGrass );
    this.grassColor = new Color( 25 + cS(), 205 + cS(), 15 + cS(), 0.8 );
    this.marginShape = new Path( outerPool );
    this.marginColor = new Color( 20 + cS(), 160 + cS(), 40 + cS(), 0.8 );
    this.poolShape = new Path( innerPool );
    this.poolColor = new Color( 65 + cS(), 180 + cS(), 230 + cS(), 1 );
    this.orientation = orientation;
    this.canvas = new Canvas();
  }

  // TODO add orientation support
  draw( origin, drawGrass=true ) {
    const x = origin.x;
    const y = origin.y;
    const z = origin.z;

    const iso = this.canvas.iso();
    this.canvas.setIndex(x + y + (2 * z));

    const grass = this.grassShape.translate( x, y, z );
    const margin = this.marginShape.translate( x, y, z );
    const pool = this.poolShape.translate( x, y, z );

    if(drawGrass) {
      iso.add( grass, this.grassColor );
    }
    iso.add( margin, this.marginColor );
    iso.add( pool, this.poolColor );
  }

}
