/**
  * Generate a generic ground bloc, and return an array containing ground and grass
  * @return Bloc bloc {Shape,Color,Shape,Color};
  */
function generateGroundBloc(){
  var bloc = {
    ground : Shape.Prism(new Point(0,0,-1),1,1,0.98),
    groundColor : new Color(120+cS(), 63+cS(), 13+cS(), 0.95),
    grass : Shape.Prism(new Point(0,0,-0,02),1,1,0.02),
    grassColor : new Color(25+cS(), 205+cS(), 15+cS(), 0.8)
  };
  return bloc ;
}

function generateGround(xSize, ySize){
  var blocs = [];
  for(var x = 0; x < xSize + 1; x++){
    for(var y = 0; y < ySize + 1; y++){
      blocs.push(generateGroundBloc());
    }
  }
  var ground = {
    xSize : xSize,
    ySize : ySize,
    blocs : blocs
  };
  return ground;
}

/**
  * Draw the ground bloc passed in param.
  * @param Isomer iso : the layer to display on
  * @param Bloc GroundBloc : a block
  * @param Point origin : botmost point of the display
  */
function drawGroundBloc(iso, bloc, origin){
  var x = origin.x;
  var y = origin.y;
  iso.add(bloc.ground.translate(x,y), bloc.groundColor);
  iso.add(bloc.grass.translate(x,y), bloc.grassColor);
}

/**
  * Draw the ground bloc passed in param on a grid.
  * @param Isomer iso : the layer to display on
  * @param Ground ground : a ground object
  */
function drawGround(iso, ground){
  var xSize = ground.xSize ;
  var ySize = ground.ySize ;
  var blocs = ground.blocs ;
  for (var x = xSize-1; x >= 0; x--) {
    for (var y = ySize-1; y >= 0; y--) {
      drawGroundBloc(iso, blocs[x+y*x], new Point(x,y));
    }
  }
}
