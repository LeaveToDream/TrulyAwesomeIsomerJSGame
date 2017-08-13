/* global Path, Point, Color, white */

// When in classic isometric rectangle
/**
 * Draw a grid
 * @param Isomer iso : the layer to display on
 * @param int xSize, int ySize : nb of line/column to display
 * @param int zHeight : strating height of the grid
 * @param Color gridColor : color of the grid
 */
function drawGrid (iso, xSize, ySize, zHeight, gridColor) {
  for (var x = 0; x < xSize + 1; x++) {
    iso.add(new Path([
      new Point(x, 0, zHeight),
      new Point(x, xSize, zHeight),
      new Point(x, 0, zHeight)
    ]), gridColor);
  }
  for (var y = 0; y < ySize + 1; y++) {
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
function drawAbsisse (iso, xSize, ySize) {
  // X absisse flag
  iso.add(new Path([Point(xSize - 1, 1, 0), Point(xSize, 0, 0), Point(xSize - 1, 1, 0)]), white);
  iso.add(new Path([Point(xSize, 1, 0), Point(xSize - 1, 0, 0), Point(xSize, 1, 0)]), white);

  // Y absisse flag
  iso.add(new Path([Point(0, ySize, 0), Point(0.5, ySize - 0.5, 0), Point(0, ySize, 0)]), white);
  iso.add(new Path([Point(1, ySize, 0), Point(0, ySize - 1, 0), Point(1, ySize, 0)]), white);
}

/**
 * Draw both the grid and X & Y flags
 * @param Isomer iso : the layer to display on
 * @param int xSize, int ySize : nb of line/column of the grid
 */
function drawConvenient (iso, xSize, ySize) {
  drawGrid(iso, xSize, ySize, 0, new Color(10, 160, 0, 1));
  drawAbsisse(iso, xSize, ySize);
}
