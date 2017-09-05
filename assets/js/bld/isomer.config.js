// First, declaring global convenient and mandatory vars for usage of IsomerJS
var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Path = Isomer.Path;
var Color = Isomer.Color;
// Then, creating a base palette of color for convenience
var black = new Color(0, 0, 0);
var red = new Color(255, 0, 0);
var blue = new Color(0, 255, 0);
var green = new Color(0, 0, 255);
var magenta = new Color(255, 255, 0);
var cyan = new Color(0, 255, 255);
var yellow = new Color(255, 0, 255);
var white = new Color(255, 255, 255);
var colors = [black, red, blue, green, magenta, cyan, yellow, white];
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
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
