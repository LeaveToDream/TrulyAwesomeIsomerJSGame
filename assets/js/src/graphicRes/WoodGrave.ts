/**
  * Alias for woodCrossAngleSalt().
  */
function wS() {
  return salt(Math.PI / 4);
}

class WoodGrave {

  grassShape;
  grassColor;
  boardOneShape;
  boardTwoShape;
  boardColor;
  orientation: number;
  canvas: Canvas;

  constructor(orientation: number = 0) {

    // Generating a wood cross
    // Points per shape
    const coveringGrass = [
      Point(0, 0, -0.02),
      Point(1, 0, -0.02),
      Point(1, 1, -0.02),
      Point(0, 1, -0.02)
    ];
    const boardOne = [
      Point(0.33, 0.5, 0),
      Point(0.66, 0.5, 0),
      Point(0.66, 0.6, 0),
      Point(0.33, 0.6, 0)
    ];
    const boardTwo = [
      Point(0.1, 0.5, 0.45),
      Point(0.9, 0.5, 0.45),
      Point(0.9, 0.45, 0.45),
      Point(0.1, 0.45, 0.45)
    ];

    // Paths
    const grassPath = new Path(coveringGrass);
    const boardOnePath = new Path(boardOne);
    const boardTwoPath = new Path(boardTwo);

    // Shapes
    let boardOneShape = Shape.extrude(boardOnePath, 0.9);
    let boardTwoShape = Shape.extrude(boardTwoPath, 0.3);

    boardTwoShape = boardTwoShape.rotateY(Point(0.5, 0, 0.55), wS());
    if (flipCoin()) {
      boardOneShape = boardOneShape.rotateZ(Point(0.5, 0.5, 0), 3 * Math.PI / 2);
      boardTwoShape = boardTwoShape.rotateZ(Point(0.5, 0.5, 0), 3 * Math.PI / 2);
    }
    this.grassShape = Shape.extrude(grassPath, 0.02);
    this.grassColor = new Color(25 + cS(), 205 + cS(), 15 + cS(), 0.8);
    this.boardOneShape = boardOneShape;
    this.boardTwoShape = boardTwoShape;
    this.boardColor = new Color(100 + cS(), 50 + cS(), 25 + cS(), 1);
    this.orientation = orientation;
    this.canvas = new Canvas();
  }

  // TODO add orientation support
  draw(origin, drawGrass = true) {
    const x = origin.x;
    const y = origin.y;
    const z = origin.z;

    const iso = this.canvas.iso();
    this.canvas.setIndex(x + y + (2 * z));

    if (drawGrass) {
      const grass = this.grassShape.translate(x, y, z);
      iso.add(grass, this.grassColor);
    }

    const boardOne = this.boardOneShape.translate(x, y, z);
    const boardTwo = this.boardTwoShape.translate(x, y, z);
    iso.add(boardOne, this.boardColor);
    iso.add(boardTwo, this.boardColor);
  }
}
