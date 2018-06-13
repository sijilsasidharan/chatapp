import { Component, OnInit, Input, Output, ViewChild, ElementRef, Renderer2, AfterViewInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-canvas-tool',
  templateUrl: './canvas-tool.component.html',
  styleUrls: ['./canvas-tool.component.css']
})
export class CanvasToolComponent implements OnInit, AfterViewInit {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  @Input() ch: any;
  @Input() cw: any;
  @ViewChild('canvas') container: ElementRef;
  shape: any;
  topX;
  topY;
  bottomX;
  bottomY;
  rectWidth;
  rectHeight;
  radius;
  lineWidth = 1;
  strockStyle = 'red';
  renderOnly = false;
  color: string[]

  @Input()shapeList: any[];

  @Output() getShapes = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.color = ['black', 'red', 'blue', 'yellow', 'green']
    if (this.shapeList && this.shapeList.length) {
      this.renderOnly = true;
    }
  }

  ngAfterViewInit() {
    this.cw = this.cw || 500;
    this.ch = this.ch || 170;
    this.canvas = this.renderer.createElement('canvas');
    this.renderer.listen(this.canvas, 'mousedown', this.onDrawStart);
    this.renderer.listen(this.canvas, 'mouseup', this.onDrawEnd);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.cw;
    this.canvas.height = this.ch;
    this.renderer.appendChild(this.container.nativeElement, this.canvas);
    this.ctx.stroke();
    if (this.shapeList && this.shapeList.length && this.renderOnly) {
      this.renderOnly = true;
      this.shapeList.map(
        value => {
          this.shape = value.shape;
          this.topX = value.topX;
          this.topY = value.topY;
          this.strockStyle = value.strock_style;
          this.lineWidth = value.line_width;
          if (value.shape === 'rectangle') {
            this.rectHeight = value.height;
            this.rectWidth = value.width;
            console.log(this.topX, ' ', this.topY, ' ', this.rectHeight, ' ', this.rectWidth);
            this.drawRectangle();
          }
          else if (value.shape === 'circle') {
            this.radius = value.radius;
            this.drawCircle();
          }
          else if(value.shape === 'line') {
            this.topX = value.topX;
            this.topY = value.topY;
            this.bottomX = value.bottomX;
            this.bottomY = value.bottomY;
            console.log(this.topX,' ', this.topY,' ', this.bottomX,' ', this.bottomY)
            this.drawLine()
          }
        }
      );
    }
  else {
      this.shapeList = this.shapeList || [];
    }
  }

  drawRectangle() {
    this.ctx.beginPath();
    console.log(this.lineWidth, this.strockStyle)
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strockStyle;
    this.ctx.rect(this.topX, this.topY, this.rectWidth, this.rectHeight);
    this.ctx.stroke();
    const shape = {
      shape : this.shape,
      strock_style : this.strockStyle,
      line_width : this.lineWidth,
      topX : this.topX,
      topY : this.topY,
      height : this.rectHeight,
      width : this.rectWidth
    };
    if (!this.renderOnly) {
     this.shapeList.push(shape);
    }
  }

  drawCircle() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strockStyle;
    this.ctx.arc(this.topX, this.topY, this.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    const shape = {
      shape : this.shape,
      strock_style : this.strockStyle,
      line_width : this.lineWidth,
      topX : this.topX,
      topY : this.topY,
      radius: this.radius
    };
    if (!this.renderOnly) {
      this.shapeList.push(shape);
     }
  }

  drawLine() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = this.strockStyle;
    console.log('enter')
    this.ctx.moveTo(this.topX, this.topY)
    this.ctx.lineTo(this.bottomX, this.bottomY);
    this.ctx.stroke();

    
      const shape = {
        shape : this.shape,
        strock_style : this.strockStyle,
        line_width : this.lineWidth,
        topX : this.topX,
        topY : this.topY,
        bottomX: this.bottomX,
        bottomY: this.bottomY
      };
      if (!this.renderOnly) {
        this.shapeList.push(shape);
     }
  }

  onDrawStart = (event: MouseEvent) => {
    if (this.shape === 'rectangle' || this.shape === 'circle'  || this.shape === 'line' ) {
      this.topX = event.pageX - this.canvas.offsetLeft;
      this.topY = event.pageY - this.canvas.offsetTop;
    }
  }

  onDrawEnd = (event: MouseEvent) => {
    if (this.shape === 'rectangle') {
      this.rectWidth = (event.pageX - this.canvas.offsetLeft) - this.topX;
      this.rectHeight = (event.pageY - this.canvas.offsetTop) - this.topY;

      console.log( this.canvas.clientTop + ' ' + this.canvas.clientHeight);
      this.drawRectangle();
    }
    else if (this.shape === 'circle') {
      const width = (event.pageX - this.canvas.offsetLeft) - this.topX;
      const height = (event.pageY - this.canvas.offsetTop) - this.topY;
      this.radius = Math.sqrt((width * width) + (height * height));
      this.drawCircle();
    }
    else if (this.shape === 'line') {
      this.bottomX = event.pageX - this.canvas.offsetLeft;
      this.bottomY = event.pageY - this.canvas.offsetTop;
      this.drawLine();
    }

    this.getShapes.emit(this.shapeList);
  }

  send() {
    this.getShapes.emit(this.shapeList);
  }
}
