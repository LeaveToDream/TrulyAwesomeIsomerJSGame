let canvasId = 0;
class Canvas {

  private id:number;
  private width: number;
  private height: number;
  private element: any;
  private layer: any;
  private displayed: boolean;

  constructor(zIndex?:number) {
    this.width = 1900;
    this.height = 1200;
    canvasId++;
    this.id = canvasId;
    this.element = $('<canvas/>', { 'class': 'canvas', id: this.id })
      .prop({ width: this.width, height: this.height });
    this.layer = new Isomer(this.element[0]);
    if(zIndex!=undefined){
      this.setIndex(zIndex);
    }
  }

  setIndex(zIndex:number) {
    this.element.css("z-index", 80-zIndex);
  }

  clear() {
    this.element[0].getContext('2d').clearRect(0, 0, this.width, this.height);
  }

  iso() {
    if(!this.displayed){
      canvasContainer.append(this.element);
      this.displayed=true;
    }
    return this.layer;
  }
}
