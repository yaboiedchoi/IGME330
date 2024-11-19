import { getRadialGradient } from "../utils";

export class Eyes {
  // Private properties
  private gradient: CanvasGradient | null = null;
  private colorStops: { percent: number; color: string }[] = [
    { percent: 0, color: "red" },
    { percent: 1, color: "black" },
  ];
  private r = 0;
  private g = 0;
  private b = 0;

  // Define public properties
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private radius: number;
  private audioData: Uint8Array;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    audioData: Uint8Array
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.audioData = audioData;
  }

  update(r: number, g: number, b: number): void {
    // Set color
    this.r = r;
    this.g = g;
    this.b = b;

    // Calculate alpha based on audio data
    let alphaOffset = 0;
    let alpha = 1;
    for (let i = 0; i < this.audioData.length; i++) {
      alphaOffset += this.audioData[i] / 255;
    }
    alphaOffset /= this.audioData.length;
    alphaOffset *= 0.75;
    alpha -= alphaOffset;

    // Update color stops
    this.colorStops = [
      { percent: 0, color: `rgba(${this.r},${this.g},${this.b},${alpha})` },
      { percent: 1, color: "black" },
    ];

    // Update gradient
    this.gradient = getRadialGradient(
      this.ctx,
      this.x,
      this.y + 20,
      5,
      this.x,
      this.y,
      this.radius,
      this.colorStops
    );
  }

  draw(): void {
    if (!this.gradient) {
      console.warn("Gradient is not initialized. Call update() first.");
      return;
    }
    this.ctx.save();
    this.ctx.fillStyle = this.gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
