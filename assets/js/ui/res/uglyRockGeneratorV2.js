/* global salt, Point, Path, Color */

/**
 * Alias for rockSalt2().
 */
function rS2 () {
  return salt(0.2);
}

/**
 * generate a(n) (ugly) rock
 * @return Rock allPaths : an array of array of path, reprensenting a rock layer
 * by layer.
 */
function generateRock2 () {
  // Points per level
  // margin & width of base
  var mB = 0.5;
  var wB = 2;

  var mIB = 0.15; // Margin increment for inner points

  var base = [
    Point(mB + mIB + (rS2()), mB + mIB + (rS2()), 0),
    Point(wB / 2 + rS2(), mB + rS2(), 0),
    Point(wB - (mB + mIB) + (rS2() / 2), (mB + mIB) + (rS2() / 2), 0),
    Point(wB - mB + rS2(), wB / 2 + rS2(), 0),
    Point(wB - (mB + mIB) + (rS2() / 2), wB - (mB + mIB) + (rS2() / 2), 0),
    Point(wB / 2 + rS2(), wB - mB + rS2(), 0),
    Point((mB + mIB) + (rS2() / 2), wB - (mB + mIB) + (rS2() / 2), 0),
    Point(mB + rS2(), wB / 2 + rS2(), 0)
  ];
  var levelOne = [
    Point((mB + mIB) + (rS2() / 2), (mB + mIB) + (rS2() / 2), 0.45 + rS2()),
    Point(wB / 2 + rS2(), mB + rS2(), 0.45 + rS2()),
    Point(wB - (mB + mIB) + (rS2() / 2), (mB + mIB) + (rS2() / 2), 0.45 + rS2()),
    Point(wB - mB + rS2(), wB / 2 + rS2(), 0.50 + rS2()),
    Point(wB - (mB + mIB) + (rS2() / 2), wB - (mB + mIB) + (rS2() / 2), 0.55 + rS2()),
    Point(wB / 2 + rS2(), wB - mB + rS2(), 0.55 + rS2()),
    Point((mB + mIB) + (rS2() / 2), wB - (mB + mIB) + (rS2() / 2), 0.50 + rS2()),
    Point(mB + rS2(), wB / 2 + rS2(), 0.45 + rS2())
  ];
  /* var levelTwo = [
   Point(wB / 2 + rS2(), wB / 2 + rS2(), 0.75 + rS2() / 2)
  ]; */

  // Paths
  var groundP = [new Path(base)];
  var levelOneP = [];
  var levelTwoP = [new Path(levelOne)];

  var jj;
  for (var j = 0; j < levelOne.length; j++) {
    jj = (j + 1) % levelOne.length;
    levelOneP.push(new Path(
      base[j],
      base[jj],
      levelOne[jj],
      levelOne[j]
    ));
  }

  console.log(levelOneP);

  var allPaths = [
    groundP,
    levelOneP,
    levelTwoP
  ];

  var rock = {
    width: wB,
    allPaths: allPaths
  };

  return rock;
}

/**
 * Draw a rock
 * @param Isomer iso : the layer to display on
 * @param Rock rock : a rock (array of array of paths)
 * @param Point origin : botmost point of the display
 * @param int rotate : angle in radian to rotate the rock on the z axis
 */
function drawRock2 (iso, rock, origin, rotate) {
  var grey = new Color(80, 80, 80, 1);
  var x = origin.x;
  var y = origin.y;
  var z = origin.z;
  var paths = rock.allPaths;
  for (var i = 0, lenI = paths.length; i < lenI; i++) {
    for (var j = 0, lenJ = paths[i].length; j < lenJ; j++) {
      var part = paths[i][j];
      part = part.rotateZ(Point(rock.width / 2, rock.width / 2, 0), rotate);
      part = part.translate(x, y, z);
      iso.add(part, grey);
    }
  }
}
