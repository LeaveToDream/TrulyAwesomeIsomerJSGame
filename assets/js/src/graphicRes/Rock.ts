/**
 * Alias for rockSalt().
 */
function rS() {
  return salt(0.2);
}

class Rock implements Inanimate {


  width: number;
  allPaths; // array of array of path, reprensenting a rock layer by layer.*/
  rockColor;
  orientation: number;
  canvas: Canvas;

  /**
   * Generate a rock
   */
  constructor(color = new Color(80, 80, 80, 1), orientation = 0) {

    // Points per level
    // margin & width of base
    const mB = 0.5;
    const wB = 2;

    const mIB = 0.15; // Margin increment for inner points

    const base = [
      Point(mB + mIB + (rS()), mB + mIB + (rS()), 0),
      Point(wB / 2 + rS(), mB + rS(), 0),
      Point(wB - (mB + mIB) + (rS() / 2), (mB + mIB) + (rS() / 2), 0),
      Point(wB - mB + rS(), wB / 2 + rS(), 0),
      Point(wB - (mB + mIB) + (rS() / 2), wB - (mB + mIB) + (rS() / 2), 0),
      Point(wB / 2 + rS(), wB - mB + rS(), 0),
      Point((mB + mIB) + (rS() / 2), wB - (mB + mIB) + (rS() / 2), 0),
      Point(mB + rS(), wB / 2 + rS(), 0)
    ];
    const levelOne = [
      Point((mB + mIB) + (rS() / 2), (mB + mIB) + (rS() / 2), 0.45 + rS()),
      Point(wB / 2 + rS(), mB + rS(), 0.45 + rS()),
      Point(wB - (mB + mIB) + (rS() / 2), (mB + mIB) + (rS() / 2), 0.45 + rS()),
      Point(wB - mB + rS(), wB / 2 + rS(), 0.50 + rS()),
      Point(wB - (mB + mIB) + (rS() / 2), wB - (mB + mIB) + (rS() / 2), 0.55 + rS()),
      Point(wB / 2 + rS(), wB - mB + rS(), 0.55 + rS()),
      Point((mB + mIB) + (rS() / 2), wB - (mB + mIB) + (rS() / 2), 0.50 + rS()),
      Point(mB + rS(), wB / 2 + rS(), 0.45 + rS())
    ];
    /* const levelTwo = [
     Point(wB / 2 + rS(), wB / 2 + rS(), 0.75 + rS() / 2)
    ]; */

    // Paths
    const groundP = [new Path(base)];
    let levelOneP = [];
    const levelTwoP = [new Path(levelOne)];

    let jj;
    for (let j = 0; j < levelOne.length; j++) {
      jj = (j + 1) % levelOne.length;
      levelOneP.push(new Path(
        base[j],
        base[jj],
        levelOne[jj],
        levelOne[j]
      ));
    }

    const allPaths = [
      groundP,
      levelOneP,
      levelTwoP
    ];

    this.width = wB;
    this.allPaths = allPaths;
    this.rockColor = color;
    this.orientation = orientation;
    this.canvas = new Canvas();
  }

  /**
   * Draw a rock
   * // @param Isomer iso : the layer to display on
   * @param Point origin : botmost point of the display
   * // @param int rotate : angle in radian to rotate the rock on the z axis
   */
  // TODO add orientation support
  // TODO add grass for delimitation
  draw(origin, drawGrass = false) {
    const grey = new Color(80, 80, 80, 1);
    const x = origin.x - this.width/4;
    const y = origin.y - this.width/4;
    const z = origin.z;

    const iso = this.canvas.iso();
    this.canvas.setIndex(origin.x + origin.y + (2 * z));

    const paths = this.allPaths;
    let part;
    for (let i = 0, lenI = paths.length; i < lenI; i++) {
      for (let j = 0, lenJ = paths[i].length; j < lenJ; j++) {
        part = paths[i][j];
        part = part.rotateZ(Point(this.width / 2, this.width / 2, 0), this.orientation);
        part = part.translate(x, y, z);
        iso.add(part, grey);
      }
    }
  }
}
