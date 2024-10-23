const makeColor = (red, green, blue, alpha = 1) => {
    return `rgba(${red},${green},${blue},${alpha})`;
  };
  
  const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  
  const getRandomColor = () => {
    const floor = 35; // so that colors are not too bright or too dark 
    const getByte = () => getRandom(floor,255-floor);
    return `rgba(${getByte()},${getByte()},${getByte()},1)`;
  };
  
  const getLinearGradient = (ctx,startX,startY,endX,endY,colorStops) => {
    let lg = ctx.createLinearGradient(startX,startY,endX,endY);
    for(let stop of colorStops){
      lg.addColorStop(stop.percent,stop.color);
    }
    return lg;
  };

  const getRadialGradient = (ctx,x1,y1,innerRadius,x2,y2,outerRadius,colorStops) => {
    let rg = ctx.createRadialGradient(x1,y1,innerRadius,x2,y2,outerRadius);
    for(let stop of colorStops){
      rg.addColorStop(stop.percent,stop.color);
    }
    return rg;
  };
  
  // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  const goFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
      element.mozRequestFullscreen();
    } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
    // .. and do nothing if the method is not supported
  };
  
  class Eyelid {
    constructor(ctx, topLeftX, topLeftY, bottomLeftX, bottomLeftY, width, audioData) {
      this.ctx = ctx;
      this.topLeftX = topLeftX;
      this.topLeftY = topLeftY;
      this.bottomLeftX = bottomLeftX;
      this.bottomLeftY = bottomLeftY;
      this.width = width;
      this.audioData = audioData;
    }
    update(){

    }
    draw(){

    }
  }
  // // eyelids left
  // ctx.save();
  // ctx.fillStyle = "gray";
  // ctx.translate(0, -eyelidOffset * 40);
  // ctx.beginPath();
  // ctx.moveTo(280,80);
  // ctx.lineTo(360,80);
  // ctx.lineTo(380,120);
  // ctx.lineTo(260,120);
  // ctx.fill();
  // ctx.closePath();
  // ctx.restore();

  // // eyelids right
  // ctx.save();
  // ctx.fillStyle = "gray";
  // ctx.translate(0, -eyelidOffset * 40);
  // ctx.beginPath();
  // ctx.moveTo(520,80);
  // ctx.lineTo(440,80);
  // ctx.lineTo(420,120);
  // ctx.lineTo(540,120);
  // ctx.fill();
  // ctx.closePath();
  // ctx.restore();

  export {makeColor, getRandomColor, getLinearGradient, getRadialGradient, goFullscreen, Eyelid};