var Player = (function () {
    function Player() {
    }
    Player.prototype.distance = function (other) {
        return this.distanceToPoint(other.position.x, other.position.y);
    };
    Player.prototype.distanceToPoint = function (x, y) {
        return Math.sqrt(Math.pow((x - this.position.x), 2) + Math.pow((y - this.position.y), 2));
    };
    Player.prototype.draw = function () {
        this.texture.draw(this.position.getPoint());
    };
    Player.prototype.isDead = function () {
        return this.ressources.health > 0;
    };
    Player.prototype.isAlive = function () {
        return !this.isDead();
    };
    return Player;
}());
