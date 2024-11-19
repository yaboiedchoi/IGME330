// TypeScript: Read app data with a callback
const readAppData = (callback: (data: any) => void): void => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/av-data.json', true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    } else {
      console.error('Error reading the shape data');
    }
  };

  xhr.onerror = () => {
    console.error('Request failed');
  };

  xhr.send();
};

// TypeScript: Make color function with RGB and optional alpha
const makeColor = (red: number, green: number, blue: number, alpha: number = 1): string => {
  return `rgba(${red},${green},${blue},${alpha})`;
};

// TypeScript: Get a random number between min and max
const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// TypeScript: Generate a random color within a certain range for RGB values
const getRandomColor = (): string => {
  const floor = 35; // so that colors are not too bright or too dark 
  const getByte = (): number => getRandom(floor, 255 - floor);
  return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

// TypeScript: Create a linear gradient
const getLinearGradient = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  colorStops: { percent: number; color: string }[]
): CanvasGradient => {
  let lg = ctx.createLinearGradient(startX, startY, endX, endY);
  for (let stop of colorStops) {
    lg.addColorStop(stop.percent, stop.color);
  }
  return lg;
};

// TypeScript: Create a radial gradient
const getRadialGradient = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  innerRadius: number,
  x2: number,
  y2: number,
  outerRadius: number,
  colorStops: { percent: number; color: string }[]
): CanvasGradient => {
  let rg = ctx.createRadialGradient(x1, y1, innerRadius, x2, y2, outerRadius);
  for (let stop of colorStops) {
    rg.addColorStop(stop.percent, stop.color);
  }
  return rg;
};

// TypeScript: Go fullscreen with element
const goFullscreen = (element: HTMLElement): void => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
  // .. and do nothing if the method is not supported
};

export { makeColor, getRandomColor, getLinearGradient, getRadialGradient, goFullscreen, readAppData };
