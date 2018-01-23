
enum TILESTATE {
  VOID,
  PLAYER,
  ENEMY,
  DECOR
}

class World {

  framerate: number;
  SecondPerTurn: number;
  xSize: number;
  ySize: number;
  map: TILESTATE[][];
  decors: Decor[];
  player: WizardPlayer;
  enemies: GelaxPlayer[];
  focus: {
    running: boolean,
    breath: number;
    player: Player,
    threadId: number
  }
  groundTexture: Ground;

  constructor(xSize: number, ySize: number) {

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
    for (let i = 0; i < xSize; i++) {
      this.map[i] = new Array(ySize);
      for (let j = 0; j < ySize; j++) {
        this.map[i][j] = TILESTATE.VOID;
      }
    }

    this.groundTexture = new Ground(xSize, ySize);
    this.drawBackground();

    this.decors = new Array();

    this.enemies = new Array();
  }

  addDecor(decor: Decor) {
    if (this.map[decor.coordinate.getX()][decor.coordinate.getY()] == TILESTATE.VOID) {
      this.decors.push(decor);
      this.map[decor.coordinate.x][decor.coordinate.y] = TILESTATE.DECOR;
      decor.draw();
      return 0;
    } else {
      console.warn("Error adding Decor at coordinate (" + decor.coordinate.x + ", " + decor.coordinate.y + ") :");
      console.warn(decor);
      return 1;
    }
  }

  addEnemy(gelax: GelaxPlayer, draw: boolean = false) {
    if (this.map[gelax.position.x][gelax.position.y] == TILESTATE.VOID && draw) {
      this.map[gelax.position.x][gelax.position.y] = TILESTATE.ENEMY;
    } else if (draw) {
      console.warn("Error adding Gelax at coordinate (" + gelax.position.x + ", " + gelax.position.y + ") :");
      console.warn(gelax);
      return 1;
    }
    this.enemies.push(gelax);
    return 0;
  }

  addEnemies(...gelaxes: GelaxPlayer[]) {
    for (let gelax of gelaxes) {
      this.addEnemy(gelax);
    }
  }

  lastEnemy() {
    return this.enemies[this.enemies.length - 1];
  }

  setEnemyPosition(enemy: GelaxPlayer, x: number, y: number) {
    if (this.map[x][y] == TILESTATE.VOID) {
      this.map[x][y] = TILESTATE.ENEMY;
      enemy.position.set(x, y);
      enemy.draw();
      return 0;
    } else {
      console.warn("Error setting an Enemy to coordinate to (" + x + "," + y + ") : Non empty target tile.");
      console.warn(enemy);
      return 1;
    }
  }

  moveEnemyPosition(enemy: GelaxPlayer, x: number, y: number) {
    if (this.map[enemy.position.getX()][enemy.position.getY()] == TILESTATE.ENEMY) {
      return this.setEnemyPosition(enemy, x, y);
    } else {
      console.warn("Error moving Enemy from (" + enemy.position.x + ", " + enemy.position.y + ") to (" + x + "," + y + ") : No Enemy in depart tile.");
      console.warn(enemy);
      return 1;
    }
  }


  setPlayer(wizard: WizardPlayer, draw: boolean = false) {
    this.player = wizard;
    if (this.map[wizard.position.x][wizard.position.y] == TILESTATE.VOID && draw) {
      this.map[wizard.position.x][wizard.position.y] = TILESTATE.PLAYER;
      wizard.draw();
    } else if (draw) {
      console.warn("Error adding Wizard at coordinate (" + wizard.position.x + ", " + wizard.position.y + ") :");
      console.warn(wizard);
      return 1;
    }
    return 0;
  }

  setPlayerPosition(x: number, y: number) {
    if (this.map[x][y] == TILESTATE.VOID) {
      this.map[x][y] = TILESTATE.PLAYER;
      this.player.position.set(x, y);
      this.player.draw();
      return 0;
    } else {
      console.warn("Error setting Wizard to coordinate to (" + x + "," + y + ") : Non empty target tile.");
      console.warn(this.player);
      return 1;
    }
  }

  movePlayerPosition(x: number, y: number) {
    if (this.map[this.player.position.getX()][this.player.position.getY()] == TILESTATE.PLAYER) {
      return this.setPlayerPosition(x, y);
    } else {
      console.warn("Error moving Wizard from (" + this.player.position.x + ", " + this.player.position.y + ") to (" + x + "," + y + ") : No wizard in depart tile.");
      console.warn(this.player);
      return 1;
    }
  }

  findPath(start: Coord, target: Coord){
    // All the same than func below, but aim to work.
    const bestFirst = false ;

    // First we convert TILESTATE to walkable:boolean
    let preGrid = this.map.map(function(e) {
      return e.map(function(f) {
        return (f == TILESTATE.VOID) ? 0 : 1;
      })
    });


    // We remove the moving objects :
    preGrid[start.x][start.y] = 0;
    preGrid[target.x][target.y] = 0;

    // We transpose the matrix to correspond to PF's argument
    preGrid = this.transpose(preGrid);

    // We generate a PF Grid from this.
    let grid = new PF.Grid(preGrid);

    // We select the finder
    let finder: any;
    if (bestFirst) {
      finder = new PF.BestFirstFinder();
    } else {
      finder = new PF.AStarFinder();
    }

    // We generate a path
    let path = finder.findPath(start.x, start.y, target.x, target.y, grid);

    // We return the path converted from Array to Coord
    return path.map(function(e) {
      return new Coord(e[0], e[1]);
    });
  }

  printMatrix(matrix: any[][]) {
    let temp = "";
    for (var i = 0; i < matrix.length; i++) {
      temp += "x = " + i + " : ";
      for (var j = 0; j < matrix[i].length; j++) {
        temp += matrix[i][j] + ' ';
      }
      console.log(temp);
      temp = '';
    }
  }

  transpose(matrix:any[][]){
    // Only works if matrix is square.
    let transposing = new Array();
    for (let i = 0; i < matrix.length; i++) {
      transposing.push(new Array())
      for (let j = 0; j < matrix[i].length; j++) {
        transposing[i].push(matrix[j][i]);
      }
    }
    return transposing;
  }


  // Drawers function

  drawBackground() {
    this.groundTexture.draw();
  }

  drawInanimate() {
    // For now, the appearance of grass under decors depend of default value.
    // We will see later for a more precise control.
    for (let elmt of this.decors) {
      elmt.texture.draw(new Point(elmt.coordinate.x, elmt.coordinate.y));
    }
  }

  drawPlayers() {
    let players: Player[] = this.enemies.slice();
    players.push(this.player);

    for (let elmt of players) {
      elmt.texture.draw(new Point(elmt.position.x, elmt.position.y));
    }
  }

  animateFocused() {
    this.focus.player.texture.draw(this.focus.player.position.getPoint(), 0);
    this.focus.breath = (this.focus.breath + Math.PI / (this.framerate * this.SecondPerTurn)) % (Math.PI * 2);
  }

  setFocus(player: Player) {
    this.focus.player = player;
    if (this.focus.running != true) {
      this.focus.breath = 0;
      this.focus.threadId = setInterval(this.animateFocused, 1000 / this.framerate);
      this.focus.running = true;
    } else {
      console.warn("Error while trying to animate focus.")
    }
  }

  unsetFocus() {
    if (this.focus.running == true) {
      clearInterval(this.focus.threadId);
      this.focus.player.draw();
      this.focus.player = null;
      this.focus.threadId = null;
      this.focus.running = false;
    } else {
      console.warn("Error while trying to stop animating focus.")
    }
  }


}
