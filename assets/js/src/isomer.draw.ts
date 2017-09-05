/*
// Utils vars
const xSize = 13;
const ySize = 13;

// Functional vars
const framerate = 30;
const SecondPerTurn = 4;
let rotate = 0;

// Resources generation
const rockOne = new Rock();
const rockTwo1 = new Rock();
const rockTwo2 = new Rock();
const tree1 = new TallTree();
const tree2 = new TallTree();
const tree3 = new TallTree();
const rockGrave1 = new RockGrave();
const rockGrave2 = new RockGrave(60);
const woodGrave1 = new WoodGrave();
const woodGrave2 = new WoodGrave();
const wizardRed = new Wizard(red, 12);
const wizardBlack = new Wizard(black, 6);
const wizardWhite = new Wizard(white, 4);
const gelaxRed = new Gelax(red);
const gelaxWhite = new Gelax(white);
const gelaxBlack = new Gelax(black);

// World generation
const ground = new Ground(xSize, ySize)

function drawBackground(ground: Ground) {
  ground.draw();
}

/*
function drawSquareBackground (xSize, ySize) {
  const iso = isomerLayer[0];
  drawSquareGround(iso, new SquareGround(xSize, ySize));
  drawSquareConvenient(iso, xSize, ySize);
}
  Right now, SquareGround is not functionning.
*/
/*
function drawInanimate() {
  rockGrave1.draw(new Point(1, 3, 0));
  rockGrave2.draw(new Point(3, 1, 0));


  woodGrave1.draw(new Point(1, 1, 0));
  woodGrave2.draw(new Point(3, 3, 0));


  rockOne.draw(new Point(6, 0, 0));
  rockTwo1.draw(new Point(6, 8, 0));
  rockTwo2.draw(new Point(9, 4, 0));


  tree1.draw(new Point(9, 9, 0));
  tree2.draw(new Point(2, 7, 0));
  tree3.draw(new Point(6, 4, 0));
}

function drawAnimated() {

  wizardWhite.draw(new Point(2, 11, 0), 0);
  wizardRed.draw(new Point(1, 10, 0), 0);
  wizardBlack.draw(new Point(0, 11, 0), 0);

  gelaxRed.draw(new Point(10, 2, 0), 0);
  gelaxWhite.draw(new Point(11, 1, 0), 0);
  gelaxBlack.draw(new Point(9, 1, 0), 0);

  rotate = (rotate + Math.PI / (framerate * SecondPerTurn)) % (Math.PI * 2);
}

drawBackground(ground);
drawInanimate();
setInterval(drawAnimated, 1000 / framerate);
//drawAnimated();

*/
