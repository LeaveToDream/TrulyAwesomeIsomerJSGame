class GelaxPlayer extends Player {

  level: number;
  attack: number;
  range: number;
  color:any;
  ressources: Ressources;
  position: Coord;
  texture: Gelax;

  constructor(level: number, attack: number, color = red, position?:Coord) {
    super();
    this.level = level;
    this.attack = attack;
    this.range = 1;
    this.color = color;
    this.texture = new Gelax(color);
    this.ressources = new Ressources(level);
    this.position = (position != undefined) ? position : new Coord ();
  }

  /**
   * Return the boolean telling if the gelax can attack the player.
   * @param  {WizardPlayer} player [description]
   * @return {boolean}             [description]
   */
  canAttack(player: WizardPlayer): boolean {
    return this.distance(player) < this.range;
  }

  /**
   * Make $this goes from its actual location to coordinate.
   * Will have to find a way to manage display of movement, but further.
   * @param  {Coord[]}        path Where to go
   * @param  {TILESTATE[][]}  map  Object containing the state of each tiles
   */
  goTo(path: Coord[], map: TILESTATE[][]): TILESTATE[][] {
    // Disapearing
    // Moving
    // Reapearing
    // Updating map

    // Check if the target is accessible :
    let target = path[path.length - 1];
    if (map[target.x][target.y] == TILESTATE.VOID) {
      map[target.x][target.y] = TILESTATE.ENEMY;
      map[this.position.x][this.position.y] = TILESTATE.VOID;
      this.position = target;
      this.draw();
    } else {
      console.error("Shit happened moving " + this + " to (" + target.x + "," + target.y + ")");
    }
    return map;
  }


  /**
   * Compute the best way to go from actual location to coordinate.
   * @param {Coord} coordinate Coordinate of the player
   * @param {World} map        Object containing the world, especialy the map
   * and the wrapper for PathFinder.js
   */
  bestPath(coordinate: Coord, world: World): Coord[] {
    // Now we have a road from the location to the wizard
    // Well, there is still a probleme, if there is no way to the contact of the wizard.
    // Let's bet that anyway, the player is not supposed to be circled, or he shall die
    // quickly.
    return world.findPath(this.position, coordinate);


  }

  attackPlayer(player: WizardPlayer): WizardPlayer {
    if (this.canAttack(player)) {
      if (this.ressources.mana > 0) {
        if (player.ressources.health > 0) {
          this.ressources.mana -= 1;
          player.ressources.health = Math.max(0, player.ressources.health - this.attack);
        }
      } else {
        console.error("Error inflicting damage(s) : ");
        console.error(this);
        console.error("don't have enought mana to attack");
      }
    } else {
      console.error("Error inflicting damage(s) : ");
      console.error(this);
      console.error("don't have range to attack");
    }
    return player;
  }
}
