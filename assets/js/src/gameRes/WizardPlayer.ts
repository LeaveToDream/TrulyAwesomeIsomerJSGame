class WizardPlayer extends Player {

  level: number;
  color;
  spells:Spell[];
  items:Item[];
  texture: Wizard;
  ressources: Ressources;
  position :Coord;

  constructor(level:number=1, color = randomColor(), position?:Coord) {
    super();
    this.level = level;
    this.color = color;
    this.texture = new Wizard(color);
    this.ressources = new Ressources(level);
    this.position = (position != undefined) ? position : new Coord ();
  }

  selectCard() {

  }



}
