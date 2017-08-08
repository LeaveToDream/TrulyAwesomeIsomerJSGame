/**
  * Alias for rockSalt().
  */
function rS(){
  return salt(0.5);
}


/**
 * generate a(n) (ugly) rock
 * @return Rock allPaths : an array of array of path, reprensenting a rock layer
 * by layer.
 */
function generateRock(){
  // Points per level
  var base = [
    Point(1+rS(),1+rS(),0),
    Point(2+rS(),1+rS(),0),
    Point(2+rS(),2+rS(),0),
    Point(1+rS(),2+rS(),0)
  ];
  var levelOne = [
    Point(1.5+rS(),0.7+rS(),0.85+rS()),
    Point(2.2+rS(),1.5+rS(),0.85+rS()),
    Point(1.5+rS(),2.2+rS(),0.85+rS()),
    Point(0.7+rS(),1.5+rS(),0.85+rS())
  ];
  var levelTwo = [
    Point(1.5+rS(),1.5+rS(),1.2+rS())
  ];

  //Paths
  var groundP = [new Path(base)];
  var levelOneDownP = [
    new Path(base[0], base[1],levelOne[0]),
    new Path(base[1], base[2],levelOne[1]),
    new Path(base[2], base[3],levelOne[2]),
    new Path(base[3], base[0],levelOne[3])
  ];
  var levelOneUpP = [
    new Path(levelOne[0], levelOne[1],base[1]),
    new Path(levelOne[1], levelOne[2],base[2]),
    new Path(levelOne[2], levelOne[3],base[3]),
    new Path(levelOne[3], levelOne[0],base[0])
  ];
  var levelTwoP = [
    new Path(levelOne[0],levelOne[1],levelTwo[0]),
    new Path(levelOne[2],levelOne[1],levelTwo[0]),
    new Path(levelOne[2],levelOne[3],levelTwo[0]),
    new Path(levelOne[0],levelOne[3],levelTwo[0]),
  ];
  var allPaths = [
    groundP,
    levelOneDownP,
    levelOneUpP,
    levelTwoP
  ];

  return allPaths;
}

/**
  * Draw a rock
  * @param Isomer iso : the layer to display on
  * @param Rock rock : a rock (array of array of paths)
  * @param Point origin : botmost point of the display
  * @param int rotate : angle in radian to rotate the rock on the z axis
  */
function drawRock(iso, rock, origin, rotate){
  var grey = new Color(80,80,80,1);
  var x = origin.x ;
  var y = origin.y ;
  var z = origin.z ;
  for (var i = 0, lenI = rock.length; i < lenI; i++) {
    for (var j = 0, lenJ = rock[i].length; j < lenJ; j++) {
      var part = rock[i][j] ;
      part = part.rotateZ(Point(1.5,1.5,0),rotate);
      part = part.translate(x,y,z);
      iso.add(part, grey);
    }
  }
}

/*
var rotate = 0 ;
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawGrid(10,10,0,gridColor);
  drawAbsisse();
  drawCaillou(rotate);
  rotate = (rotate+Math.PI/120)%(Math.PI*2);
}

setInterval(draw, 1000 / 30);
/**/
