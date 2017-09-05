var Wizard = (function () {
    function Wizard(color, vertices) {
        if (color === void 0) { color = red; }
        if (vertices === void 0) { vertices = 12; }
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
            circleOne.push(new Point(radiusOne * Math.cos(i * deuxPi / vertices), radiusOne * Math.sin(i * deuxPi / vertices), 0));
            circleTwo.push(new Point(radiusTwo * Math.cos(i * deuxPi / vertices), radiusTwo * Math.sin(i * deuxPi / vertices), heightTwo));
            circleThree.push(new Point(radiusThree * Math.cos(i * deuxPi / vertices), radiusThree * Math.sin(i * deuxPi / vertices), heightThree));
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
        var colors = {
            hat: [color, color, white, color],
            armAndLeg: black,
            bellyAndHead: color
        };
        if (color.r === 255 && color.g === 255 && color.b === 255) {
            colors.hat[2] = black;
        }
        if (color.r === 0 && color.g === 0 && color.b === 0) {
            colors.armAndLeg = new Color(40, 40, 40);
        }
        this.body = body;
        this.hat = hat;
        this.colors = colors;
        this.canvas = new Canvas();
    }
    // TODO add orientation support
    Wizard.prototype.draw = function (origin, breath) {
        if (breath === void 0) { breath = 0; }
        var x = origin.x;
        var y = origin.y;
        var z = origin.z;
        var iso = this.canvas.iso();
        this.canvas.setIndex(x + y + (2 * z));
        // Drawing the body
        iso.add(this.body.leftLeg.translate(x, y, z), this.colors.armAndLeg);
        iso.add(this.body.rightLeg.translate(x, y, z), this.colors.armAndLeg);
        iso.add(this.body.leftArm.translate(x, y, z), this.colors.armAndLeg);
        iso.add(this.body.belly.translate(x, y, z), this.colors.bellyAndHead);
        iso.add(this.body.rightArm.translate(x, y, z), this.colors.armAndLeg);
        iso.add(this.body.head.translate(x, y, z), this.colors.bellyAndHead);
        // Drawing the hat
        for (var i = 0, lenI = this.hat.length; i < lenI; i++) {
            for (var j = 0, lenJ = this.hat[i].length; j < lenJ; j++) {
                var hatPart = this.hat[i][j].translate(0.5 + x, 0.5 + y, 1.1 + z);
                iso.add(hatPart, this.colors.hat[i]);
            }
        }
    };
    return Wizard;
}());
