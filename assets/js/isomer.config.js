// First, declaring global convenient and mandatory vars for usage of IsomerJS
var canvas = [
  document.getElementById("Background"),
  document.getElementById("Middleground"),
  document.getElementById("DaPlace"),
  document.getElementById("Foreground")
];
var isomerLayer = [
  new Isomer(canvas[0]),
  new Isomer(canvas[1]),
  new Isomer(canvas[2]),
  new Isomer(canvas[3])
];
var context = [
  canvas[0].getContext("2d"),
  canvas[1].getContext("2d"),
  canvas[2].getContext("2d"),
  canvas[3].getContext("2d")
];
var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Path = Isomer.Path;
var Color = Isomer.Color;

// Then, creating a base palette of color for convenience
var black = new Color(0,0,0);
var red = new Color(255,0,0);
var blue = new Color(0,255,0);
var green = new Color(0,0,255);
var magenta = new Color(255,255,0);
var cyan = new Color(0,255,255);
var yellow = new Color(255,0,255);
var white = new Color(255,255,255);


// Then generating usefull functions for 3D representation (grid, and x&y absisse flag)
/**
 * Draw a grid
 * @param Isomer iso : the layer to display on
 * @param int xSize, int ySize : nb of line/column to display
 * @param int zHeight : strating height of the grid
 * @param Color gridColor : color of the grid
 */
function drawGrid(iso, xSize, ySize, zHeight, gridColor) {
  for (x = 0; x < xSize + 1; x++) {
    iso.add(new Path([
      new Point(x, 0, zHeight),
      new Point(x, xSize, zHeight),
      new Point(x, 0, zHeight)
    ]), gridColor);
  }
  for (y = 0; y < ySize + 1; y++) {
    iso.add(new Path([
      new Point(0, y, zHeight),
      new Point(ySize, y, zHeight),
      new Point(0, y, zHeight)
    ]), gridColor);
  }
}

/**
  * Draw X and Y to know where they are graphicly
  * @param Isomer iso : the layer to display on
  * @param int xSize, int ySize : nb of line/column of the grid where you want
  * to display flags
  */
function drawAbsisse(iso, xSize, ySize){
  // X absisse flag
  iso.add(new Path([Point(xSize-1,1,0), Point(xSize,0,0), Point(xSize-1,1,0)]), white);
  iso.add(new Path([Point(xSize,1,0), Point(xSize-1,0,0), Point(xSize,1,0)]), white);

  // Y absisse flag
  iso.add(new Path([Point(0,ySize,0), Point(0.5,ySize-0.5,0), Point(0,ySize,0)]), white);
  iso.add(new Path([Point(1,ySize,0), Point(0,ySize-1,0), Point(1,ySize,0)]), white);
}

/**
 * Draw both the grid and X & Y flags
 * @param Isomer iso : the layer to display on
 * @param int xSize, int ySize : nb of line/column of the grid
 */
function drawConvenient(iso, xSize, ySize){
  drawGrid(iso, xSize, ySize, 0, new Color(10, 160, 0, 1));
  drawAbsisse(iso, xSize, ySize);
}

// Now we had salt functions

/**
 * Return a random number in [-width/2;width/2[, to salt values
 * @param int width : the widlth of the interval
 * @return int salt : a "random" value in the interval
 */
function salt(width){
  return (Math.random()*width)-(width/2) ;
}

/**
 * Flip coin simulator
 * @return true 50% of the time, false otherwise
 */
function flipCoin(){
  return salt(10)>0;
}

/**
 * Alias for colorSalt().
 */
function cS(){
  return salt(15);
}
