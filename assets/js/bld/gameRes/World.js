var TILESTATE;
(function (TILESTATE) {
    TILESTATE[TILESTATE["VOID"] = 0] = "VOID";
    TILESTATE[TILESTATE["PLAYER"] = 1] = "PLAYER";
    TILESTATE[TILESTATE["ENEMY"] = 2] = "ENEMY";
    TILESTATE[TILESTATE["DECOR"] = 3] = "DECOR";
})(TILESTATE || (TILESTATE = {}));
var World = (function () {
    function World(xSize, ySize) {
        this.framerate = 30;
        this.SecondPerTurn = 4;
        this.focus = {
            running: false,
            breath: 0,
            threadId: null,
            player: null
        };
        this.xSize = xSize;
        this.ySize = ySize;
        this.map = new Array(xSize);
        for (var i = 0; i < xSize; i++) {
            this.map[i] = new Array(ySize);
            for (var j = 0; j < ySize; j++) {
                this.map[i][j] = TILESTATE.VOID;
            }
        }
        this.groundTexture = new Ground(xSize, ySize);
        this.drawBackground();
        this.decors = new Array();
        this.enemies = new Array();
    }
    World.prototype.addDecor = function (decor) {
        if (this.map[decor.coordinate.getX()][decor.coordinate.getY()] == TILESTATE.VOID) {
            this.decors.push(decor);
            this.map[decor.coordinate.x][decor.coordinate.y] = TILESTATE.DECOR;
            decor.draw();
            return 0;
        }
        else {
            console.warn("Error adding Decor at coordinate (" + decor.coordinate.x + ", " + decor.coordinate.y + ") :");
            console.warn(decor);
            return 1;
        }
    };
    World.prototype.addEnemy = function (gelax, draw) {
        if (draw === void 0) { draw = false; }
        if (this.map[gelax.position.x][gelax.position.y] == TILESTATE.VOID && draw) {
            this.map[gelax.position.x][gelax.position.y] = TILESTATE.ENEMY;
        }
        else if (draw) {
            console.warn("Error adding Gelax at coordinate (" + gelax.position.x + ", " + gelax.position.y + ") :");
            console.warn(gelax);
            return 1;
        }
        this.enemies.push(gelax);
        return 0;
    };
    World.prototype.addEnemies = function () {
        var gelaxes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            gelaxes[_i] = arguments[_i];
        }
        for (var _a = 0, gelaxes_1 = gelaxes; _a < gelaxes_1.length; _a++) {
            var gelax = gelaxes_1[_a];
            this.addEnemy(gelax);
        }
    };
    World.prototype.lastEnemy = function () {
        return this.enemies[this.enemies.length - 1];
    };
    World.prototype.setEnemyPosition = function (enemy, x, y) {
        if (this.map[x][y] == TILESTATE.VOID) {
            this.map[x][y] = TILESTATE.ENEMY;
            enemy.position.set(x, y);
            enemy.draw();
            return 0;
        }
        else {
            console.warn("Error setting an Enemy to coordinate to (" + x + "," + y + ") : Non empty target tile.");
            console.warn(enemy);
            return 1;
        }
    };
    World.prototype.moveEnemyPosition = function (enemy, x, y) {
        if (this.map[enemy.position.getX()][enemy.position.getY()] == TILESTATE.PLAYER) {
            return this.setEnemyPosition(enemy, x, y);
        }
        else {
            console.warn("Error moving Wizard from (" + enemy.position.x + ", " + enemy.position.y + ") to (" + x + "," + y + ") : No wizard in depart tile.");
            console.warn(enemy);
            return 1;
        }
    };
    World.prototype.setPlayer = function (wizard, draw) {
        if (draw === void 0) { draw = false; }
        this.player = wizard;
        if (this.map[wizard.position.x][wizard.position.y] == TILESTATE.VOID && draw) {
            this.map[wizard.position.x][wizard.position.y] = TILESTATE.PLAYER;
            wizard.draw();
        }
        else if (draw) {
            console.warn("Error adding Wizard at coordinate (" + wizard.position.x + ", " + wizard.position.y + ") :");
            console.warn(wizard);
            return 1;
        }
        return 0;
    };
    World.prototype.setPlayerPosition = function (x, y) {
        if (this.map[x][y] == TILESTATE.VOID) {
            this.map[x][y] = TILESTATE.PLAYER;
            this.player.position.set(x, y);
            this.player.draw();
            return 0;
        }
        else {
            console.warn("Error setting Wizard to coordinate to (" + x + "," + y + ") : Non empty target tile.");
            console.warn(this.player);
            return 1;
        }
    };
    World.prototype.movePlayerPosition = function (x, y) {
        if (this.map[this.player.position.getX()][this.player.position.getY()] == TILESTATE.PLAYER) {
            return this.setPlayerPosition(x, y);
        }
        else {
            console.warn("Error moving Wizard from (" + this.player.position.x + ", " + this.player.position.y + ") to (" + x + "," + y + ") : No wizard in depart tile.");
            console.warn(this.player);
            return 1;
        }
    };
    World.prototype.findPath = function (start, target) {
        // All the same than func below, but aim to work.
        var bestFirst = false;
        // First we convert TILESTATE to walkable:boolean
        var preGrid = this.map.map(function (e) {
            return e.map(function (f) {
                return (f == TILESTATE.VOID) ? 0 : 1;
            });
        });
        // We remove the moving objects :
        preGrid[start.x][start.y] = 0;
        preGrid[target.x][target.y] = 0;
        // We transpose the matrix to correspond to PF's argument
        preGrid = this.transpose(preGrid);
        // We generate a PF Grid from this.
        var grid = new PF.Grid(preGrid);
        // We select the finder
        var finder;
        if (bestFirst) {
            finder = new PF.BestFirstFinder();
        }
        else {
            finder = new PF.AStarFinder();
        }
        // We generate a path
        var path = finder.findPath(start.x, start.y, target.x, target.y, grid);
        // We return the path converted from Array to Coord
        return path.map(function (e) {
            return new Coord(e[0], e[1]);
        });
    };
    /*findPathOld(start: Coord, target: Coord) { // DEPRECATED
      // TESTING VARS
      const log = true;
      const transp = true;
      const bestFirst = false; // 0 for A*, 1 for BestFirst
  
  
      // First turn map into PFgrid
  
      if (log) console.log("Looking for path from (" + start.x + " to " + start.y + ") to (" + target.x + ", " + target.y + ")")
  
      let preGrid = this.map.map(function(e) {
        return e.map(function(f) {
          return (f == TILESTATE.VOID) ? 0 : 1;
        })
      });
  
      if (transp) {
        preGrid = this.transpose(preGrid);
      }
  
      preGrid[start.x][start.y] = 0;
      preGrid[target.x][target.y] = 0;
      if (log) console.log("map")
  
      this.printMatrix(this.map);
  
      if (log) console.log("preGrid : ")
      //console.log(preGrid);
      if (log) this.printMatrix(preGrid);
  
      let grid = new PF.Grid(preGrid);
  
      if (log) console.log("Grid :")
      if (log) console.log(grid);
      //if (log) this.printMatrix(grid);
  
      // Then we select a finder
      // For now, i choosed the more straight forward one. It may one day become a probleme
      let finder: any;
      if (bestFirst) {
        finder = new PF.BestFirstFinder();
      } else {
        finder = new PF.AStarFinder();
      }
      /*let finder = new PF.JumpPointFinder({
        diagonalMovement: PF.DiagonalMovement.Never
      });*/
    /*
    // Use PF to compute that god damn best path
    let path = finder.findPath(start.x, start.y, target.x, target.y, grid);



    if (log) console.log("Path");
    if (log) console.log(path);
    // And finaly turn the path to something the rest of the game understand :)

    return path.map(function(e) {
      return new Coord(e[0], e[1]);
    });
  }*/
    World.prototype.printMatrix = function (matrix) {
        var temp = "";
        for (var i = 0; i < matrix.length; i++) {
            temp += "x = " + i + " : ";
            for (var j = 0; j < matrix[i].length; j++) {
                temp += matrix[i][j] + ' ';
            }
            console.log(temp);
            temp = '';
        }
    };
    World.prototype.transpose = function (matrix) {
        // Only works if matrix is square.
        var transposing = new Array();
        for (var i = 0; i < matrix.length; i++) {
            transposing.push(new Array());
            for (var j = 0; j < matrix[i].length; j++) {
                transposing[i].push(matrix[j][i]);
            }
        }
        return transposing;
    };
    // Drawers function
    World.prototype.drawBackground = function () {
        this.groundTexture.draw();
    };
    World.prototype.drawInanimate = function () {
        // For now, the appearance of grass under decors depend of default value.
        // We will see later for a more precise control.
        for (var _i = 0, _a = this.decors; _i < _a.length; _i++) {
            var elmt = _a[_i];
            elmt.texture.draw(new Point(elmt.coordinate.x, elmt.coordinate.y));
        }
    };
    World.prototype.drawPlayers = function () {
        var players = this.enemies.slice();
        players.push(this.player);
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var elmt = players_1[_i];
            elmt.texture.draw(new Point(elmt.position.x, elmt.position.y));
        }
    };
    World.prototype.animateFocused = function () {
        this.focus.player.texture.draw(this.focus.player.position.getPoint(), 0);
        this.focus.breath = (this.focus.breath + Math.PI / (this.framerate * this.SecondPerTurn)) % (Math.PI * 2);
    };
    World.prototype.setFocus = function (player) {
        this.focus.player = player;
        if (this.focus.running != true) {
            this.focus.breath = 0;
            this.focus.threadId = setInterval(this.animateFocused, 1000 / this.framerate);
            this.focus.running = true;
        }
        else {
            console.warn("Error while trying to animate focus.");
        }
    };
    World.prototype.unsetFocus = function () {
        if (this.focus.running == true) {
            clearInterval(this.focus.threadId);
            this.focus.player.draw();
            this.focus.player = null;
            this.focus.threadId = null;
            this.focus.running = false;
        }
        else {
            console.warn("Error while trying to stop animating focus.");
        }
    };
    return World;
}());
