export class Eyelid {
  private eyelidOffset = 0;

  // Define the types of the class properties
  private ctx: CanvasRenderingContext2D;
  private topLeftX: number;
  private topLeftY: number;
  private bottomLeftX: number;
  private bottomLeftY: number;
  private shortWidth: number;
  private wideWidth: number;
  private audioData: Uint8Array;

  constructor(
    ctx: CanvasRenderingContext2D,
    topLeftX: number,
    topLeftY: number,
    bottomLeftX: number,
    bottomLeftY: number,
    shortWidth: number,
    wideWidth: number,
    audioData: Uint8Array
  ) {
    this.ctx = ctx;
    this.topLeftX = topLeftX;
    this.topLeftY = topLeftY;
    this.bottomLeftX = bottomLeftX;
    this.bottomLeftY = bottomLeftY;
    this.shortWidth = shortWidth;
    this.wideWidth = wideWidth;
    this.audioData = audioData;
  }

  // Update method to calculate eyelid offset
  update(): void {
    this.eyelidOffset = 0;
    for (let i = 0; i < this.audioData.length; i++) {
      this.eyelidOffset += this.audioData[i] / 255;
    }
    this.eyelidOffset /= this.audioData.length;
  }

  // Draw method to render the eyelid
  draw(): void {
    this.ctx.save();
    this.ctx.fillStyle = "gray";
    this.ctx.translate(0, -this.eyelidOffset * 40);
    this.ctx.beginPath();
    this.ctx.moveTo(this.topLeftX, this.topLeftY);
    this.ctx.lineTo(this.topLeftX + this.shortWidth, this.topLeftY);
    this.ctx.lineTo(this.bottomLeftX + this.wideWidth, this.bottomLeftY);
    this.ctx.lineTo(this.bottomLeftX, this.bottomLeftY);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
