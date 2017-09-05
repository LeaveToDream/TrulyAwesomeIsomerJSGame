var PLAYERSTATE;
(function (PLAYERSTATE) {
    PLAYERSTATE[PLAYERSTATE["DEAD"] = 0] = "DEAD";
    PLAYERSTATE[PLAYERSTATE["ALIVE"] = 1] = "ALIVE";
    PLAYERSTATE[PLAYERSTATE["WIN"] = 2] = "WIN";
})(PLAYERSTATE || (PLAYERSTATE = {}));
// Main game classe
var Game = (function () {
    function Game(level) {
        if (level === void 0) { level = 5; }
        // Step 1 : Get level selection
        this.level = level; // For now, it's just 1
        // Step 2 : World Generation
        this.xSize = 8 + this.level;
        this.ySize = 8 + this.level;
        this.world = new World(this.xSize, this.ySize);
        var treeCount = 2 + Math.floor(this.level / 1.2);
        //let treeCount = 50 ;
        var x;
        var y;
        for (var i = 0; i < treeCount; i++) {
            do {
                x = Math.floor(Math.random() * (this.xSize - 2)); // x coordinate of the center of the tree
                y = Math.floor(Math.min(Math.max(0, x + (Math.random() * 10) - 5), this.ySize - 3));
                // y coordinate of the center of the tree. But it has to be centered, to let right
                // and left part of the board clean for player & enemies to spawn.
            } while (this.world.addDecor(new Decor(new TallTree(), new Coord(x, y))));
        }
        var rockCount = 1 + Math.floor(this.level / 1.4);
        //let rockCount = 50;
        for (var i = 0; i < rockCount; i++) {
            do {
                x = Math.floor(Math.random() * (this.xSize - 2)); // x coordinate of the center of the tree
                y = Math.floor(Math.min(Math.max(0, x + (Math.random() * 10) - 5), this.ySize - 3));
                // y coordinate of the center of the tree. But it has to be centered, to let right
                // and left part of the board clean for player & enemies to spawn.
            } while (this.world.addDecor(new Decor(new Rock(), new Coord(x, y))));
        }
        // And every other part of the landscape, let's focus on the playability
        // TODO add other landscape element
        // Step 3 : Player Generation
        this.world.setPlayer(new WizardPlayer()); // For now, player is red. It will later be possible to choose which wizard you wanna play
        while (this.world.setPlayerPosition(Math.floor(Math.random() * 3), this.ySize - (1 + Math.floor(Math.random() * 3)))) { }
        // Step 4 : global loop
        this.playing = true;
        this.playerState = PLAYERSTATE.ALIVE;
        // And there the fun begins
    }
    Game.prototype.addEnemy = function (enterZoneWidth, level, attack) {
        if (level === void 0) { level = 1; }
        if (attack === void 0) { attack = 1; }
        this.world.addEnemy(new GelaxPlayer(level, attack, randomColor()));
        // And we place them on the board
        while (this.world.setEnemyPosition(this.world.lastEnemy(), this.xSize - 1 - Math.floor(Math.random() * enterZoneWidth), Math.floor(Math.random() * enterZoneWidth))) { }
    };
    Game.prototype.addEnemies = function (nb) {
        for (var i = 0; i < nb; i++) {
            this.addEnemy(this.getEnterZone(nb));
        }
    };
    Game.prototype.getEnterZone = function (nb) {
        var i = 0;
        while (nb >= (i * (i + 1) / 2)) {
            i++;
        }
        return Math.min(Math.min(this.xSize, i), this.ySize);
    };
    Game.prototype.preRound = function () {
        // Never launch this.
        while (this.playing) {
            //this.playerState = this.round();
            if (this.playerState == PLAYERSTATE.ALIVE) {
                this.world.player.selectCard();
            }
            else {
                this.playing = false;
            }
        }
    };
    Game.prototype.playerTurn = function () {
        // Well, actualy not.
        console.info("New player turn : ");
        console.info(this.world.player);
        var supa = this;
        $(document).click(function () {
            supa.playerEndTurn();
        });
    };
    Game.prototype.playerEndTurn = function () {
        // So, the player passed
        // If there is any enemy left, first we let the enemies play, else we display winning board
        if (this.world.enemies != []) {
            this.enemiesTurn();
        }
        else {
            this.playerState = PLAYERSTATE.WIN;
            return;
        }
        // If after enemies turn the wizard is still alive, he can play. Else, he is dead.
        if (this.world.player.isDead()) {
            this.playerState = PLAYERSTATE.DEAD;
            return;
        }
        else {
            this.playerTurn();
        }
    };
    Game.prototype.enemiesTurn = function () {
        console.info("New enemies turn : ");
        console.log(this.world.enemies);
        // This is a temp var to store alive gelax without raising concurent access error
        // while foreaching the array
        var livingEnemies = new Array();
        for (var _i = 0, _a = this.world.enemies; _i < _a.length; _i++) {
            var elmt = _a[_i];
            if (elmt.ressources.health !== 0) {
                if (this.world.player.ressources.health !== 0) {
                    this.enemyTurn(elmt);
                }
                livingEnemies.push(elmt); // Even if the wizard died, the gelax is alive. Fuck off.
            }
        }
        this.world.enemies = livingEnemies.slice(); // Updating enemies array
        if (this.world.player.ressources.health <= 0) {
            this.playerState = PLAYERSTATE.DEAD; // TODO put roses on his tomb
        }
    };
    Game.prototype.enemyTurn = function (enemy) {
        console.info("New enemy turn : ");
        //console.info(enemy);
        enemy.ressources.regen();
        var player = this.world.player;
        if (!enemy.canAttack(player) && enemy.ressources.stamina > 0) {
            // If the gelax has stamina to move and is not in range to attack the wizard,
            // he tries to move forward the wizard
            //console.log("I got mana and I'm not on the contact of the wizard")
            // Compute the best way to get nearer to the wizard
            var bestPath = enemy.bestPath(player.position, this.world);
            if (bestPath.length >= 2) {
                // Check that we don't go to the actual case of the wizard
                console.log("I can advance toward the wizard");
                var staminaSpend_1 = Math.min(enemy.ressources.stamina, bestPath.length - 2);
                // Cut it to represent only the path that the gelax can take with its stamina
                // The anonymous func in filter accepte parameters (elmt, index, array).
                var accessiblePath = bestPath.filter(function (e, i) { return (i <= staminaSpend_1); });
                console.log(accessiblePath);
                // We move the gelax, and update map object.
                this.world.map = enemy.goTo(accessiblePath, this.world.map);
                // And spend the stamina used to do so.
                enemy.ressources.stamina -= staminaSpend_1;
            }
            else {
                console.log("I found no way to reach the wizard");
                console.log(bestPath);
            }
        }
        while (enemy.canAttack(player) && enemy.ressources.mana > 0) {
            player = enemy.attackPlayer(player); // ATTTAAAAACKKKKKK
        }
    };
    return Game;
}());
