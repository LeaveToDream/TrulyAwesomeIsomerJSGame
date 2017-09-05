var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GelaxPlayer = (function (_super) {
    __extends(GelaxPlayer, _super);
    function GelaxPlayer(level, attack, color, position) {
        if (color === void 0) { color = red; }
        var _this = _super.call(this) || this;
        _this.level = level;
        _this.attack = attack;
        _this.range = 1;
        _this.color = color;
        _this.texture = new Gelax(color);
        _this.ressources = new Ressources(level);
        _this.position = (position != undefined) ? position : new Coord();
        return _this;
    }
    /**
     * Return the boolean telling if the gelax can attack the player.
     * @param  {WizardPlayer} player [description]
     * @return {boolean}             [description]
     */
    GelaxPlayer.prototype.canAttack = function (player) {
        return this.distance(player) < this.range;
    };
    /**
     * Make $this goes from its actual location to coordinate.
     * Will have to find a way to manage display of movement, but further.
     * @param  {Coord[]}        path Where to go
     * @param  {TILESTATE[][]}  map  Object containing the state of each tiles
     */
    GelaxPlayer.prototype.goTo = function (path, map) {
        // Disapearing
        // Moving
        // Reapearing
        // Updating map
        // Check if the target is accessible :
        var target = path[path.length - 1];
        if (map[target.x][target.y] == TILESTATE.VOID) {
            map[target.x][target.y] = TILESTATE.ENEMY;
            map[this.position.x][this.position.y] = TILESTATE.VOID;
            this.position = target;
            this.draw();
        }
        else {
            console.error("Shit happened moving " + this + " to (" + target.x + "," + target.y + ")");
        }
        return map;
    };
    /**
     * Compute the best way to go from actual location to coordinate.
     * @param {Coord} coordinate Coordinate of the player
     * @param {World} map        Object containing the world, especialy the map
     * and the wrapper for PathFinder.js
     */
    GelaxPlayer.prototype.bestPath = function (coordinate, world) {
        // Now we have a road from the location to the wizard
        // Well, there is still a probleme, if there is no way to the contact of the wizard.
        // Let's bet that anyway, the player is not supposed to be circled, or he shall die
        // quickly.
        return world.findPath(this.position, coordinate);
    };
    GelaxPlayer.prototype.attackPlayer = function (player) {
        if (this.canAttack(player)) {
            if (this.ressources.mana > 0) {
                if (player.ressources.health > 0) {
                    this.ressources.mana -= 1;
                    player.ressources.health = Math.max(0, player.ressources.health - this.attack);
                }
            }
            else {
                console.error("Error inflicting damage(s) : ");
                console.error(this);
                console.error("don't have enought mana to attack");
            }
        }
        else {
            console.error("Error inflicting damage(s) : ");
            console.error(this);
            console.error("don't have range to attack");
        }
        return player;
    };
    return GelaxPlayer;
}(Player));
