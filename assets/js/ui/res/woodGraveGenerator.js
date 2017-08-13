/* global salt, Point, Path, Color, cS, Shape, flipCoin*/

/**
  * Alias for woodCrossAngleSalt().
  */
function wS () {
  return salt(Math.PI / 4);
}

function generateWoodGrave () {
  // Drawing a wood cross
  // Points per board
  var coveringGrass = [
    Point(0, 0, -0.02),
    Point(1, 0, -0.02),
    Point(1, 1, -0.02),
    Point(0, 1, -0.02)
  ];
  var boardOne = [
    Point(0.33, 0.5, 0),
    Point(0.66, 0.5, 0),
    Point(0.66, 0.6, 0),
    Point(0.33, 0.6, 0)
  ];
  var boardTwo = [
    Point(0.1, 0.5, 0.45),
    Point(0.9, 0.5, 0.45),
    Point(0.9, 0.45, 0.45),
    Point(0.1, 0.45, 0.45)
  ];

  // Paths
  var grassPath = new Path(coveringGrass);
  var boardOnePath = new Path(boardOne);
  var boardTwoPath = new Path(boardTwo);

  // Shapes
  var boardOneShape = Shape.extrude(boardOnePath, 0.9);
  var boardTwoShape = Shape.extrude(boardTwoPath, 0.3);

  boardTwoShape = boardTwoShape.rotateY(Point(0.5, 0, 0.55), wS());
  if (flipCoin()) {
    boardOneShape = boardOneShape.rotateZ(Point(0.5, 0.5, 0), 3 * Math.PI / 2);
    boardTwoShape = boardTwoShape.rotateZ(Point(0.5, 0.5, 0), 3 * Math.PI / 2);
  }

  var woodCross = {
    grassShape: Shape.extrude(grassPath, 0.02),
    grassColor: new Color(25 + cS(), 205 + cS(), 15 + cS(), 0.8),
    boardOneShape: boardOneShape,
    boardTwoShape: boardTwoShape,
    boardColor: new Color(100 + cS(), 50 + cS(), 25 + cS(), 1)
  };

  return woodCross;
}
function drawWoodGrave (iso, woodCross, origin) {
  var x = origin.x;
  var y = origin.y;
  var z = origin.z;
  var grass = woodCross.grassShape.translate(x, y, z);
  var boardOne = woodCross.boardOneShape.translate(x, y, z);
  var boardTwo = woodCross.boardTwoShape.translate(x, y, z);
  iso.add(grass, woodCross.grassColor);
  iso.add(boardOne, woodCross.boardColor);
  iso.add(boardTwo, woodCross.boardColor);
}
