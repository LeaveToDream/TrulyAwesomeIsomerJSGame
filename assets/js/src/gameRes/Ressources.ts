class Ressources {
  mana: number;
  manaPerTurn: number;
  manaMax: number;
  stamina: number;
  staminaPerTurn: number;
  staminaMax: number;
  health: number;
  healthMax: number;

  constructor(level: number) {
    this.mana = level;
    this.manaPerTurn = level;
    this.manaMax = level;
    this.stamina = level;
    this.staminaPerTurn = level;
    this.staminaMax = level;
    this.health = level;
    this.healthMax = level;
  }

  regen() {
    this.mana = Math.min(this.manaMax, this.mana + this.manaPerTurn);
    this.stamina = Math.min(this.staminaMax, this.stamina + this.staminaPerTurn);
  }

  
}
