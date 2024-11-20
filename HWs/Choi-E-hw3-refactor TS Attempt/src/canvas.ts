import * as utils from './utils';
import * as eyes from './classes/eyes';
import * as eyelid from './classes/eyelid';
import { DrawParams } from './interfaces/drawParams.interface';

let ctx,
    canvasWidth,
    canvasHeight,
    gradient,
    analyserNode,
    audioData,
    headGradient,
    leftEye,
    rightEye,
    eyelidLeft,
    eyelidRight;

// debug
let eyeGradientR;

// eye colors
let eyeColorR = 255;
let eyeColorG = 255;
let eyeColorB = 255;

const setupCanvas = (canvasElement,analyserNodeRef) => {
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
    console.log(canvasWidth + ", " + canvasHeight);
	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:0,color:"blue"},{percent:.25,color:"purple"},{percent:.5,color:"black"},{percent:.75,color:"purple"},{percent:1,color:"blue"}]);
    headGradient = utils.getLinearGradient(ctx,canvasWidth/2,0,canvasWidth/2,canvasHeight,[{percent:1,color:"gray"},{percent:0,color:"skyblue"}]);

    // gradient for eyes
    //eyeGradientL = utils.getRadialGradient(ctx,canvasWidth/2 - 80,canvasHeight/2 - 60,5,canvasWidth/2 - 80,canvasHeight/2 - 80,40,[{percent:0,color:"red"},{percent:1,color:"black"}]);
    eyeGradientR = utils.getRadialGradient(ctx,canvasWidth/2 + 80,canvasHeight/2 - 60,5,canvasWidth/2 + 80,canvasHeight/2 - 80,40,[{percent:0,color:"red"},{percent:1,color:"black"}]);

    // keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize/2);

    // eyelids classes
    eyelidLeft = new eyelid.Eyelid(ctx,280,80,260,120,80,120,audioData);
    eyelidRight = new eyelid.Eyelid(ctx,440,80,420,120,80,120,audioData);

    // hook up sliders to eye color
    let eyeColorRLabel = document.querySelector("#color-label-r") as HTMLElement;
    (document.querySelector("#eye-color-r") as HTMLInputElement).oninput = (e) => {
        const target = e.target as HTMLInputElement;
        eyeColorR = Number(target.value);
        console.log(eyeColorR + ", " + eyeColorG + ", " + eyeColorB);
        eyeColorRLabel.innerText = eyeColorR.toString();
    }
    
    // eye color g
    let eyeColorGLabel = document.querySelector("#color-label-g") as HTMLElement;
    (document.querySelector("#eye-color-g") as HTMLInputElement).oninput = (e) => {
        const target = e.target as HTMLInputElement;
        eyeColorG = Number(target.value);
        console.log(eyeColorR + ", " + eyeColorG + ", " + eyeColorB);
        eyeColorGLabel.innerText = eyeColorG.toString();
    }
    
    // eye color b
    let eyeColorBLabel = document.querySelector("#color-label-b") as HTMLElement;
    (document.querySelector("#eye-color-b") as HTMLInputElement).oninput = (e) => {
        const target = e.target as HTMLInputElement;
        eyeColorB = Number(target.value);
        console.log(eyeColorR + ", " + eyeColorG + ", " + eyeColorB);
        eyeColorBLabel.innerText = eyeColorB.toString();
    }
    // eye classes
    leftEye = new eyes.Eyes(ctx,canvasWidth/2 - 80,canvasHeight/2 - 80,40,audioData);
    rightEye = new eyes.Eyes(ctx,canvasWidth/2 + 80,canvasHeight/2 - 80,40,audioData);
}

const draw = (params:DrawParams) => {
  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference" 
    if (params.byteFreq) {
    	analyserNode.getByteFrequencyData(audioData);
    }
    else {
        analyserNode.getByteTimeDomainData(audioData); // waveform data
    }

	// 2 - draw background
	ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore();
		
    // draw robot head
    ctx.save();
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.roundRect(canvasWidth/4,10,canvasWidth / 2,canvasHeight - 20, 50);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    // draw robot left eye
    leftEye.update(eyeColorR,eyeColorG,eyeColorB);
    leftEye.draw();

    // right eye
    rightEye.update(eyeColorR,eyeColorG,eyeColorB);
    rightEye.draw();

    
    // eyelids left
    eyelidLeft.update();
    eyelidLeft.draw();

    // eyelids right
    eyelidRight.update();
    eyelidRight.draw();

	// 3 - draw gradient
	if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = .3;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        ctx.restore();
    }
	// 4 - draw bars
	if (params.mouthType == "mouth1") {
        let barSpacing = 0;
        let barWidth = 1;
        let barMaxHeight = 70;
        
        ctx.save();
        ctx.fillStyle = "red";
        for (let i = 10; i < audioData.length + 10; i++) {
            ctx.fillRect((canvasWidth / 2) - ((i - 10) * (barWidth + barSpacing)), 
                         300 - ((audioData[i] / 255) * barMaxHeight),
                         barWidth,
                         ((audioData[i] * 2 / 255) * barMaxHeight));

            ctx.fillRect((canvasWidth / 2) + ((i - 10) * (barWidth + barSpacing)), 
                         300 - ((audioData[i] / 255) * barMaxHeight),
                         barWidth,
                         ((audioData[i] * 2 / 255) * barMaxHeight));
        }

        ctx.restore();
    } // other mouth type
    else if (params.mouthType == "mouth2") {
        let maxHeight = 30;
        //console.log("mouth2");
        ctx.save();
        ctx.strokeStyle = "purple";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(400 - audioData.length, 300)
        for (let i = 0; i < audioData.length; i+=3) {
            console.log(audioData[audioData.length - i]);
            if(i % 2 == 0) {
                ctx.lineTo(400 - audioData.length + i, 300 - (audioData[audioData.length - i] * maxHeight / 255));
            }
            else {
                ctx.lineTo(400 - audioData.length + i, 300 + (audioData[audioData.length - i] * maxHeight / 255));
            }
        }
        for (let i = 0; i < audioData.length; i+=3) {
            if (i % 2 == 0) {
                ctx.lineTo(400 + i, 300 - (audioData[i] * maxHeight / 255));
            }
            else {
                ctx.lineTo(400 + i, 300 + (audioData[i] * maxHeight / 255));
            }
        }
        ctx.lineTo(400 + audioData.length, 300);
        ctx.lineTo(400 - audioData.length, 300);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}

export {setupCanvas,draw};