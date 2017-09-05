interface Drawable {
  draw : any ;
}

interface Animated extends Drawable {
  draw : (origin, breath?:number)=>void;
}

interface Inanimate extends Drawable {
  draw : (origin, drawGrass?:boolean)=>void;
}

class Decor {
  constructor(public texture: Drawable,public coordinate:Coord){}

  draw(){
    this.texture.draw(this.coordinate.getPoint());
  }
}
