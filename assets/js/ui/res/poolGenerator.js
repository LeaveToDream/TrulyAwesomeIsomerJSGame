/* global salt, Point, Path, Color, cS */

/**
  * Alias for poolSalt().
  */
function pS () {
  return salt(0.4);
}

function generatePool () {
  // Points per level
  var coveringGrass = [
    Point(0, 0, 0),
    Point(3, 0, 0),
    Point(3, 4, 0),
    Point(0, 4, 0)
  ];
  var innerPool = [
    Point(1 + pS(), 0.5 + pS(), 0),
    Point(2 + pS(), 0.5 + pS(), 0),
    Point(2.5 + pS(), 1 + pS(), 0),
    Point(2.5 + pS(), 3 + pS(), 0),
    Point(2 + pS(), 3.5 + pS(), 0),
    Point(1 + pS(), 3.5 + pS(), 0),
    Point(0.5 + pS(), 3 + pS(), 0),
    Point(0.5 + pS(), 1 + pS(), 0)
  ];
  var grassMargin = 0.15;
  var iP = innerPool;
  var gM = grassMargin;
  var outerPool = [
    Point(iP[0].x - gM, iP[0].y - gM, 0),
    Point(iP[1].x + gM, iP[1].y - gM, 0),
    Point(iP[2].x + gM, iP[2].y - gM, 0),
    Point(iP[3].x + gM, iP[3].y + gM, 0),
    Point(iP[4].x + gM, iP[4].y + gM, 0),
    Point(iP[5].x - gM, iP[5].y + gM, 0),
    Point(iP[6].x - gM, iP[6].y + gM, 0),
    Point(iP[7].x - gM, iP[7].y - gM, 0)
  ];
  var pool = {
    grassShape: new Path(coveringGrass),
    grassColor: new Color(25 + cS(), 205 + cS(), 15 + cS(), 0.8),
    marginShape: new Path(outerPool),
    marginColor: new Color(20 + cS(), 160 + cS(), 40 + cS(), 0.8),
    poolShape: new Path(innerPool),
    poolColor: new Color(65 + cS(), 180 + cS(), 230 + cS(), 1)
  };

  return pool;
}

function drawPool (iso, poolO, origin) {
  var x = origin.x;
  var y = origin.y;
  var z = origin.z;
  var grass = poolO.grassShape.translate(x, y, z);
  var margin = poolO.marginShape.translate(x, y, z);
  var pool = poolO.poolShape.translate(x, y, z);
  iso.add(grass, poolO.grassColor);
  iso.add(margin, poolO.marginColor);
  iso.add(pool, poolO.poolColor);
}
