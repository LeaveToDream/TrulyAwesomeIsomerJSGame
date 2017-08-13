/* global context, , isomerLayer, Point, canvas, red, white, black */

/* global drawConvenient, drawSquareConvenient, drawGround, drawRock, drawTree,
drawRockGrave, drawWoodGrave, drawWizard, drawGelax */

/* global generateGround, generateRock, generateTree, generateRockGrave,
generateWoodGrave, generateSquareGround, generateRock2, generateWizard,
generateGelax */

// Utils vars
var xSize = 13;
var ySize = 13;

// Functional vars
var framerate = 30;
var SecondPerTurn = 4;
var rotate = 0;

// Resources generation
var rockOne = generateRock();
var rockTwo1 = generateRock2();
var rockTwo2 = generateRock2();
var tree1 = generateTree();
var tree2 = generateTree();
var tree3 = generateTree();
var rockGrave1 = generateRockGrave();
var rockGrave2 = generateRockGrave(60);
var woodGrave1 = generateWoodGrave();
var woodGrave2 = generateWoodGrave();
var wizardRed = generateWizard(red, 12);
var wizardBlack = generateWizard(black, 6);
var wizardWhite = generateWizard(white, 4);
var gelaxRed = generateGelax(red);
var gelaxWhite = generateGelax(white);
var gelaxBlack = generateGelax(black);

function drawBackground (xSize, ySize) {
  var iso = isomerLayer[0];
  drawGround(iso, generateGround(xSize, ySize));
  drawConvenient(iso, xSize, ySize);
}

function drawSquareBackground (xSize, ySize) {
  var iso = isomerLayer[0];
  drawSquareGround(iso, generateSquareGround(xSize, ySize));
  drawSquareConvenient(iso, xSize, ySize);
}

function drawInanimate () {
  var iso = isomerLayer[1];
  // var isoUp = isomerLayer[3];
  drawRockGrave(iso, rockGrave1, new Point(1, 3, 0));
  drawRockGrave(iso, rockGrave2, new Point(3, 1, 0));

  drawWoodGrave(iso, woodGrave1, new Point(1, 1, 0));
  drawWoodGrave(iso, woodGrave2, new Point(3, 3, 0));
}

function drawAnimated () {
  var iso = isomerLayer[2];

  context[2].clearRect(0, 0, canvas[2].width, canvas[2].height);
  drawRock(iso, rockOne, Point(6, 0, 0), rotate);
  drawRock(iso, rockTwo1, Point(6, 8, 0), rotate);
  drawRock(iso, rockTwo2, Point(9, 4, 0), rotate);
  drawTree(iso, tree1, Point(9, 9, 0), rotate);
  drawTree(iso, tree2, Point(2, 7, 0), rotate);
  drawTree(iso, tree3, Point(6, 4, 0), rotate);

  drawWizard(iso, wizardWhite, Point(2, 11, 0));
  drawWizard(iso, wizardRed, Point(1, 10, 0));
  drawWizard(iso, wizardBlack, Point(0, 11, 0));

  drawGelax(iso, gelaxRed, Point(10, 2, 0));
  drawGelax(iso, gelaxWhite, Point(11, 1, 0));
  drawGelax(iso, gelaxBlack, Point(9, 1, 0));

  rotate = (rotate + Math.PI / (framerate * SecondPerTurn)) % (Math.PI * 2);
}

drawBackground(xSize, ySize);
drawInanimate();
// setInterval(drawAnimated, 1000 / framerate);
drawAnimated();
