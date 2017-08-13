/* global salt, Point, Path, Color */

/**
  * Alias for rockSalt().
  */
function rS () {
  return salt(0.4);
}

/**
 * generate a(n) (ugly) rock
 * @return Rock allPaths : an array of array of path, reprensenting a rock layer
 * by layer.
 */
function generateRock () {
  // Points per level
  // margin & width of base
  var mB = 0.5;
  var wB = 2;
  var base = [
    Point(mB + (rS() / 2), mB + (rS() / 2), 0),
    Point(wB - mB + (rS() / 2), mB + (rS() / 2), 0),
    Point(wB - mB + (rS() / 2), wB - mB + (rS() / 2), 0),
    Point(mB + (rS() / 2), wB - mB + (rS() / 2), 0)
  ];
  var mIB = -0.2; // Margin increment from base's one
  var levelOne = [
    Point(wB / 2 + rS(), mB + mIB + rS(), 0.65 + rS()),
    Point(wB - (mB + mIB) + rS(), wB / 2 + rS(), 0.65 + rS()),
    Point(wB / 2 + rS(), wB - (mB + mIB) + rS(), 0.65 + rS()),
    Point(mB + mIB + rS(), wB / 2 + rS(), 0.65 + rS())
  ];
  var levelTwo = [
    Point(wB / 2 + rS(), wB / 2 + rS(), 0.75 + rS() / 2)
  ];

  // Paths
  var groundP = [new Path(base)];
  var levelOneDownP = [
    new Path(base[0], base[1], levelOne[0]),
    new Path(base[1], base[2], levelOne[1]),
    new Path(base[2], base[3], levelOne[2]),
    new Path(base[3], base[0], levelOne[3])
  ];
  var levelOneUpP = [
    new Path(levelOne[0], levelOne[1], base[1]),
    new Path(levelOne[1], levelOne[2], base[2]),
    new Path(levelOne[2], levelOne[3], base[3]),
    new Path(levelOne[3], levelOne[0], base[0])
  ];
  var levelTwoP = [
    new Path(levelOne[0], levelOne[1], levelTwo[0]),
    new Path(levelOne[2], levelOne[1], levelTwo[0]),
    new Path(levelOne[2], levelOne[3], levelTwo[0]),
    new Path(levelOne[0], levelOne[3], levelTwo[0])
  ];
  var allPaths = [
    groundP,
    levelOneDownP,
    levelOneUpP,
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
function drawRock (iso, rock, origin, rotate) {
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
