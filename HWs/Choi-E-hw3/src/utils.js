// no changes needed in this file.
const readAppData = (callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../data/av-data.json', true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    } else {
      console.error('Error reading the shape data');
    }
  };

  xhr.onerror = function() {
    console.error('Request failed');
  };

  xhr.send();
}

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
    #eyelidOffset = 0;
    constructor(ctx, topLeftX, topLeftY, bottomLeftX, bottomLeftY, shortWidth, wideWidth, audioData) {
      this.ctx = ctx;
      this.topLeftX = topLeftX;
      this.topLeftY = topLeftY;
      this.bottomLeftX = bottomLeftX;
      this.bottomLeftY = bottomLeftY;
      this.shortWidth = shortWidth;
      this.wideWidth = wideWidth;
      this.audioData = audioData;
    }
    update(){
      this.#eyelidOffset = 0;
      for (let i = 0; i < this.audioData.length; i++) {
        this.#eyelidOffset += (this.audioData[i] / 255);
      }
      this.#eyelidOffset /= this.audioData.length;
    }
    draw(){
      this.ctx.save();
      this.ctx.fillStyle = "gray";
      this.ctx.translate(0, -this.#eyelidOffset * 40);
      this.ctx.beginPath();
      this.ctx.moveTo(this.topLeftX,this.topLeftY); 
      this.ctx.lineTo(this.topLeftX + this.shortWidth,this.topLeftY);
      this.ctx.lineTo(this.bottomLeftX + this.wideWidth,this.bottomLeftY);
      this.ctx.lineTo(this.bottomLeftX,this.bottomLeftY);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.restore();
    }
  }

  class Eyes {
    #gradient = null;
    #colorStops = [{percent:0,color:"red"},{percent:1,color:"black"}];
    #r = 0;
    #g = 0;
    #b = 0;
    constructor(ctx,x,y,radius,audioData) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.audioData = audioData;
    }
    update(r,g,b) {
      // set color
      this.#r = r;
      this.#g = g;
      this.#b = b;

      // set alpha based on audio data
      let alphaOffset = 0;
      let alpha = 1;
      for (let i = 0; i < this.audioData.length; i++) {
        alphaOffset += (this.audioData[i] / 255);
      }
      alphaOffset /= this.audioData.length;
      alphaOffset *= 0.75;
      alpha -= alphaOffset;

      this.#colorStops = [{percent:0,color:`rgba(${this.#r},${this.#g},${this.#b},${alpha})`},{percent:1,color:"black"}];
      //console.log(this.#colorStops);
      // update gradient (color changes)
      this.#gradient = getRadialGradient(this.ctx,
                                         this.x,
                                         this.y + 20,
                                         5,
                                         this.x,
                                         this.y,
                                         this.radius,
                                         this.#colorStops);
    }
    draw() {
      this.ctx.save();
      this.ctx.fillStyle = this.#gradient;
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
  
  // eyeGradientL = utils.getRadialGradient(ctx,
  //                                        canvasWidth/2 - 80,
  //                                        canvasHeight/2 - 60,
  //                                        5,
  //                                        canvasWidth/2 - 80,
  //                                        canvasHeight/2 - 80,
  //                                        40,
  //                                        [{percent:0,color:"red"},
  //                                         {percent:1,color:"black"}]);
  // eyeGradientR = utils.getRadialGradient(ctx,
  //                                        canvasWidth/2 + 80,
  //                                        canvasHeight/2 - 60,
  //                                        5,
  //                                        canvasWidth/2 + 80,
  //                                        canvasHeight/2 - 80,
  //                                        40,
  //                                        [{percent:0,color:"red"},
  //                                         {percent:1,color:"black"}]);
  //  // draw robot left eye
  //  ctx.save();
  //  ctx.fillStyle = eyeGradientL;
  //  ctx.beginPath();
  //  ctx.arc(canvasWidth/2 - 80,canvasHeight/2 - 80,40,0,2*Math.PI);
  //  ctx.fill();
  //  ctx.closePath();

  //  // right eye
  //  ctx.fillStyle = eyeGradientR;
  //  ctx.beginPath();
  //  ctx.arc(canvasWidth/2 + 80,canvasHeight/2 - 80,40,0,2*Math.PI);
  //  ctx.fill();
  //  ctx.closePath();
  //  ctx.restore();

  export {makeColor, getRandomColor, getLinearGradient, getRadialGradient, goFullscreen, Eyelid, Eyes, readAppData};