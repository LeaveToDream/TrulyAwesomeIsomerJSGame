// First, declaring global convenient and mandatory vars for usage of IsomerJS
const Shape = Isomer.Shape;
const Point = Isomer.Point;
const Path = Isomer.Path;
const Color = Isomer.Color;

// Then, creating a base palette of color for convenience
const black = new Color(0, 0, 0);
const red = new Color(255, 0, 0);
const blue = new Color(0, 255, 0);
const green = new Color(0, 0, 255);
const magenta = new Color(255, 255, 0);
const cyan = new Color(0, 255, 255);
const yellow = new Color(255, 0, 255);
const white = new Color(255, 255, 255);
const colors = [black, red, blue, green, magenta, cyan, yellow, white];

function randomColor(){
  return colors[Math.floor(Math.random()*colors.length)];
}

// Then generating usefull functions for 3D representation (grid, and x&y absisse flag)
// Salt functions

/**
 * Return a random number in [-width/2;width/2[, to salt values
 * @param int width : the widlth of the interval
 * @return int salt : a "random" value in the interval
 */
function salt(width) {
  return (Math.random() * width) - (width / 2);
}

/**
 * Flip coin simulator
 * @return true 50% of the time, false otherwise
 */
function flipCoin() {
  return salt(10) > 0;
}

/**
 * Alias for colorSalt().
 */
function cS() {
  return salt(15);
}
