var framerate = 30 ;
var SecondPerTurn = 2 ;
var rotate = 0;
var rock = generateRock();
var tree = generateTree();
var ground = generateGround(10,10);
drawGround(isomerLayer[0], ground);
drawConvenient(isomerLayer[0], 10, 10);
function draw(){
  context[2].clearRect(0, 0, canvas[2].width, canvas[2].height);
  drawRock(isomerLayer[2], rock, Point(6, 0, 0), rotate);
  drawTree(isomerLayer[2], tree, Point(4, 4, 0), rotate);
  //rotate = (rotate+Math.PI/180)%(Math.PI*2); //Deprecated
  rotate =  (rotate + Math.PI/(framerate*SecondPerTurn))%(Math.PI*2);
}

setInterval(draw, 1000/framerate);
