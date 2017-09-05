var Ressources = (function () {
    function Ressources(level) {
        this.mana = level;
        this.manaPerTurn = level;
        this.manaMax = level;
        this.stamina = level;
        this.staminaPerTurn = level;
        this.staminaMax = level;
        this.health = level;
        this.healthMax = level;
    }
    Ressources.prototype.regen = function () {
        this.mana = Math.min(this.manaMax, this.mana + this.manaPerTurn);
        this.stamina = Math.min(this.staminaMax, this.stamina + this.staminaPerTurn);
    };
    return Ressources;
}());
