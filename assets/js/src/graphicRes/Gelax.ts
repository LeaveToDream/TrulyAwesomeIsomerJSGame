/* global Point, Path */
class Gelax implements Animated {

  gelaxPaths: any;
  gelaxColor: any;
  orientation: number;
  canvas: Canvas;

  constructor(color = red) {
    // Drawing a gelax
    // margin & width of base
    const mB = 0.1;
    const wB = 1;
    const height = 0.8;
    const levelCount = 3;
    let allPoints = [];
    let h;

    // Points per level
    for (let i = 0; i < levelCount; i++) {
      h = height * (i / (levelCount - 1));
      allPoints.push([
        Point(mB, mB, h),
        Point(wB - mB, mB, h),
        Point(wB - mB, wB - mB, h),
        Point(mB, wB - mB, h)
      ]);
    }

    // Paths
    let i, jj;
    let allPaths = [];
    for (i = 0; i < allPoints.length - 1; i++) {
      for (let j = 0; j < 4; j++) {
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

    this.gelaxPaths = allPaths;
    this.gelaxColor = color;
    this.canvas = new Canvas;
  }

  // TODO add orientation && breathing support
  draw(origin, breath = 0) {

    this.canvas.clear();

    const x = origin.x;
    const y = origin.y;
    const z = origin.z;

    const iso = this.canvas.iso();
    this.canvas.setIndex(x + y + (2 * z));
    this.gelaxColor = new Color(this.gelaxColor.r, this.gelaxColor.g, this.gelaxColor.b, 0.7);

    for (let i = 0; i < this.gelaxPaths.length; i++) {
      iso.add(this.gelaxPaths[i].translate(x, y, z), this.gelaxColor);
    }
  }
}
