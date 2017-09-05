/// <reference path="../lib/jquery.d.ts" />
var canvasContainer = $('#canvasContainer');
var game = new Game(6);
game.addEnemies(4);
game.playerTurn();
console.log(game);
// And Go
