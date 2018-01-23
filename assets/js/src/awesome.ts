/// <reference path="../lib/jquery.d.ts" />

declare var Isomer: any; // Magic
declare var PF: any;

let canvasContainer:JQuery<HTMLElement> = $('#canvasContainer');
let game = new Game(1);
game.addEnemies(4);
//game.playerTurn();

console.log(game);
// And Go
