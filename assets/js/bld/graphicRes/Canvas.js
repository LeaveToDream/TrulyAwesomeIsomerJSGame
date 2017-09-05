var canvasId = 0;
var Canvas = (function () {
    function Canvas(zIndex) {
        this.width = 1900;
        this.height = 1200;
        canvasId++;
        this.id = canvasId;
        this.element = $('<canvas/>', { 'class': 'canvas', id: this.id })
            .prop({ width: this.width, height: this.height });
        this.layer = new Isomer(this.element[0]);
        if (zIndex != undefined) {
            this.setIndex(zIndex);
        }
    }
    Canvas.prototype.setIndex = function (zIndex) {
        this.element.css("z-index", 80 - zIndex);
    };
    Canvas.prototype.clear = function () {
        this.element[0].getContext('2d').clearRect(0, 0, this.width, this.height);
    };
    Canvas.prototype.iso = function () {
        if (!this.displayed) {
            canvasContainer.append(this.element);
            this.displayed = true;
        }
        return this.layer;
    };
    return Canvas;
}());
