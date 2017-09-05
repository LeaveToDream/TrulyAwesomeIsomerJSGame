abstract class Player {
  texture: Drawable;
  ressources: Ressources;
  position: Coord;

  distance(other: Player): number {
    return this.distanceToPoint(other.position.x, other.position.y);
  }

  distanceToPoint(x: number, y: number): number {
    return Math.sqrt((x - this.position.x) ** 2 + (y - this.position.y) ** 2);
  }

  draw(){
    this.texture.draw(this.position.getPoint());
  }

  isDead(){
    return this.ressources.health>0;
  }

  isAlive(){
    return !this.isDead();
  }
}
