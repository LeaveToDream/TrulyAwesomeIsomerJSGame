class Coord {
  constructor(public x: number = 0, public y: number = 0) { }

  sum() {
    return this.x + this.y;
  }

  getPoint(){
    return new Point(this.x, this.y);
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  set(x:number,y:number){
    this.x = x ;
    this.y = y ;
  }

}
