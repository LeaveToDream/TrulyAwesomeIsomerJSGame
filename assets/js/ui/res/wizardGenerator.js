/* global Point, Path, Shape, white, black */

function generateWizard (color, vertices) {
  // Member per member
  var body = {
    rightLeg: Shape.Prism(new Point(0.32, 0.41, 0), 0.14, 0.18, 0.33),
    leftLeg: Shape.Prism(new Point(0.54, 0.41, 0), 0.14, 0.18, 0.33),
    rightArm: Shape.Prism(new Point(0.18, 0.42, 0.42), 0.12, 0.16, 0.32),
    leftArm: Shape.Prism(new Point(0.7, 0.42, 0.42), 0.12, 0.16, 0.32),
    belly: Shape.Prism(new Point(0.3, 0.37, 0.33), 0.4, 0.26, 0.5),
    head: Shape.Prism(new Point(0.36, 0.42, 0.83), 0.16, 0.16, 0.3)
  };

  // Now, the hat
  // One big circle will be the tour. One more little will
  // be the base of piramid. But a white
  var i;
  var circleOne = [];
  var circleTwo = [];
  var circleThree = [];
  var deuxPi = 2 * Math.PI;

  // The big one
  var radiusOne = 0.4;
  // The first little
  var radiusTwo = 0.2;
  var heightTwo = 0.1;
  // The second little
  var radiusThree = 0.2;
  var heightThree = 0.2;
  for (i = 0; i < vertices; i++) {
    circleOne.push(new Point(
      radiusOne * Math.cos(i * deuxPi / vertices),
      radiusOne * Math.sin(i * deuxPi / vertices),
      0));
    circleTwo.push(new Point(
      radiusTwo * Math.cos(i * deuxPi / vertices),
      radiusTwo * Math.sin(i * deuxPi / vertices),
      heightTwo));
    circleThree.push(new Point(
      radiusThree * Math.cos(i * deuxPi / vertices),
      radiusThree * Math.sin(i * deuxPi / vertices),
      heightThree));
  }

  var top = Point(0, 0, 0.66);

  // And now, paths !
  var base = [new Path(circleOne)];

  var levelOne = [];
  var levelTwo = [];
  var levelThree = [];
  for (i = 0; i < vertices; i++) {
    var j = (i + 1) % vertices;
    levelOne.push(new Path([circleOne[i], circleOne[j], circleTwo[j], circleTwo[i]]));
    levelTwo.push(new Path([circleTwo[i], circleTwo[j], circleThree[j], circleThree[i]]));
    levelThree.push(new Path([circleThree[i], circleThree[j], top]));
  }
  var hat = [base, levelOne, levelTwo, levelThree];
  var wizard = {
    body: body,
    hat: hat,
    color: [color, color, white, color]
  };

  if (color.r === 255 && color.g === 255 && color.b === 255) {
    wizard.color[2] = black;
  }

  return wizard;
}

function drawWizard (iso, wizard, origin, rotate) {
  var x = origin.x;
  var y = origin.y;
  var z = origin.z;

  // Drawing the body
  iso.add(wizard.body.leftLeg.translate(x, y, z), black);
  iso.add(wizard.body.rightLeg.translate(x, y, z), black);
  iso.add(wizard.body.leftArm.translate(x, y, z), black);
  iso.add(wizard.body.belly.translate(x, y, z), wizard.color[0]);
  iso.add(wizard.body.rightArm.translate(x, y, z), black);
  iso.add(wizard.body.head.translate(x, y, z), wizard.color[0]);

  // Drawing the hat
  var daHat = wizard.hat;
  for (var i = 0, lenI = daHat.length; i < lenI; i++) {
    for (var j = 0, lenJ = daHat[i].length; j < lenJ; j++) {
      var hatPart = daHat[i][j].translate(0.5 + x, 0.5 + y, 1.1 + z);
      iso.add(hatPart, wizard.color[i]);
    }
  }
}
