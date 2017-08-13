/* global Point, Path */

function generateGelax (color) {
  // Drawing a gelax
  // margin & width of base
  var mB = 0.1;
  var wB = 1;
  var height = 0.8;
  var levelCount = 3;
  var allPoints = [];
  var h;

  // Points per level
  for (var i = 0; i < levelCount; i++) {
    h = height * (i / (levelCount - 1));
    allPoints.push([
      Point(mB, mB, h),
      Point(wB - mB, mB, h),
      Point(wB - mB, wB - mB, h),
      Point(mB, wB - mB, h)
    ]);
  }

  // Paths
  var jj;
  var allPaths = [];
  for (i = 0; i < allPoints.length - 1; i++) {
    for (var j = 0; j < 4; j++) {
      jj = (j + 1) % 4;
      allPaths.push(new Path(
        allPoints[i][j],
        allPoints[i][jj],
        allPoints[i + 1][jj],
        allPoints[i + 1][j]
      ));
    }
  }
  allPaths.push(new Path(
    allPoints[i][0],
    allPoints[i][1],
    allPoints[i][2],
    allPoints[i][3]
  ));

  var gelax = {
    gelaxPaths: allPaths,
    gelaxColor: color
  };

  return gelax;
}

function drawGelax (iso, gelax, origin, rotate = 0) { // Non animated version
  var x = origin.x;
  var y = origin.y;
  var z = origin.z;

  var paths = gelax.gelaxPaths;
  var color = gelax.gelaxColor;
  color.a = 0.7;

  for (var i = 0; i < paths.length; i++) {
    iso.add(paths[i].translate(x, y, z), color);
  }
}
