/* global Point, Path, Shape, Color, flipCoin, cS,  */

function generateRockGrave (vertices = 15) {
  // Drawing a tree
  // Inner margin. Short name for ease of use
  var j = 0.2;
  // length of the grave on the y absisse
  var deepness = 0.2;

  // Points per level
  var coveringGrass = [
    Point(0, 0, -0.02),
    Point(1, 0, -0.02),
    Point(1, 1, -0.02),
    Point(0, 1, -0.02)
  ];
  var grave = [
    Point(j, j, 0),
    Point(1 - j, j, 0),
    Point(1 - j, 1 - j, 0),
    Point(j, 1 - j, 0)
  ];
  var x = j;
  var y = 0.5;
  var radius = ((1 - 2 * j) / 2);
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
  for (var i = 0; i < vertices; i++) {
    grave.push(new Point(
      x - radius * Math.cos(i * 2 * Math.PI / vertices),
      y - radius * Math.sin(i * 2 * Math.PI / vertices),
      0));
  }
  /* */

  // Path
  var gravePath = new Path(grave);

  var xCenter = (((1 - 2 * j) / 2)) + deepness / 2;

  // Shape
  var graveShape = Shape.extrude(gravePath, 0.2);
  graveShape = graveShape.rotateY(Point(1 - j, 0.5, 0), -Math.PI / 2);
  graveShape = graveShape.translate(-xCenter);

  if (flipCoin()) {
    graveShape = graveShape.rotateZ(Point(xCenter, 0.5, 0), Math.PI / 2);
    graveShape = graveShape.translate(j / 2, -j / 2);
  }

  grave = {
    grassShape: Shape.extrude(new Path(coveringGrass), 0.02),
    grassColor: new Color(25 + cS(), 205 + cS(), 15 + cS(), 0.8),
    graveShape: graveShape,
    graveColor: new Color(80 + cS(), 80 + cS(), 80 + cS(), 1)
  };

  return grave;
}

function drawRockGrave (iso, graveO, origin) {
  var x = origin.x;
  var y = origin.y;
  var z = origin.z;
  var grass = graveO.grassShape.translate(x, y, z);
  var grave = graveO.graveShape.translate(x, y, z);
  iso.add(grass, graveO.grassColor);
  iso.add(grave, graveO.graveColor);
}
