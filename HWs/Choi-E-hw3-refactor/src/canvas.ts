import * as utils from './utils';
import * as eyes from './classes/eyes';
import * as eyelid from './classes/eyelid';

let ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    gradient: CanvasGradient,
    analyserNode: AnalyserNode,
    audioData: Uint8Array,
    headGradient: CanvasGradient,
    leftEye: eyes.Eyes,
    rightEye: eyes.Eyes,
    eyelidLeft: eyelid.Eyelid,
    eyelidRight: eyelid.Eyelid;

let eyeGradientR: CanvasGradient;

let eyeColorR: number = 255;
let eyeColorG: number = 255;
let eyeColorB: number = 255;

interface DrawParams {
  byteFreq?: boolean;
  showGradient?: boolean;
  mouthType?: string;
}

const setupCanvas = (canvasElement: HTMLCanvasElement, analyserNodeRef: AnalyserNode): void => {
    ctx = canvasElement.getContext("2d")!;
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    console.log(canvasWidth + ", " + canvasHeight);
    
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
        { percent: 0, color: "blue" },
        { percent: 0.25, color: "purple" },
        { percent: 0.5, color: "black" },
        { percent: 0.75, color: "purple" },
        { percent: 1, color: "blue" }
    ]);
    
    headGradient = utils.getLinearGradient(ctx, canvasWidth / 2, 0, canvasWidth / 2, canvasHeight, [
        { percent: 1, color: "gray" },
        { percent: 0, color: "skyblue" }
    ]);

    eyeGradientR = utils.getRadialGradient(ctx, canvasWidth / 2 + 80, canvasHeight / 2 - 60, 5, canvasWidth / 2 + 80, canvasHeight / 2 - 80, 40, [
        { percent: 0, color: "red" },
        { percent: 1, color: "black" }
    ]);

    analyserNode = analyserNodeRef;
    
    audioData = new Uint8Array(analyserNode.fftSize / 2);

    eyelidLeft = new eyelid.Eyelid(ctx, 280, 80, 260, 120, 80, 120, audioData);
    eyelidRight = new eyelid.Eyelid(ctx, 440, 80, 420, 120, 80, 120, audioData);

    let eyeColorRLabel: HTMLElement = document.querySelector("#color-label-r")!;
    (document.querySelector("#eye-color-r") as HTMLInputElement).oninput = (e: Event) => {
        eyeColorR = (e.target as HTMLInputElement).valueAsNumber;
        console.log(eyeColorR + ", " + eyeColorG + ", " + eyeColorB);
        eyeColorRLabel.innerText = String(eyeColorR);
    }
    
    let eyeColorGLabel: HTMLElement = document.querySelector("#color-label-g")!;
    (document.querySelector("#eye-color-g") as HTMLInputElement).oninput = (e: Event) => {
        eyeColorG = (e.target as HTMLInputElement).valueAsNumber;
        console.log(eyeColorR + ", " + eyeColorG + ", " + eyeColorB);
        eyeColorGLabel.innerText = String(eyeColorG);
    }
    
    let eyeColorBLabel: HTMLElement = document.querySelector("#color-label-b")!;
    (document.querySelector("#eye-color-b") as HTMLInputElement).oninput = (e: Event) => {
        eyeColorB = (e.target as HTMLInputElement).valueAsNumber;
        console.log(eyeColorR + ", " + eyeColorG + ", " + eyeColorB);
        eyeColorBLabel.innerText = String(eyeColorB);
    }

    leftEye = new eyes.Eyes(ctx, canvasWidth / 2 - 80, canvasHeight / 2 - 80, 40, audioData);
    rightEye = new eyes.Eyes(ctx, canvasWidth / 2 + 80, canvasHeight / 2 - 80, 40, audioData);
}

const draw = (params: DrawParams = {}): void => {
    if (params.byteFreq) {
        analyserNode.getByteFrequencyData(audioData);
    }
    else {
        analyserNode.getByteTimeDomainData(audioData);
    }

    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
        
    ctx.save();
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.roundRect(canvasWidth / 4, 10, canvasWidth / 2, canvasHeight - 20, 50);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    leftEye.update(eyeColorR, eyeColorG, eyeColorB);
    leftEye.draw();

    rightEye.update(eyeColorR, eyeColorG, eyeColorB);
    rightEye.draw();

    eyelidLeft.update();
    eyelidLeft.draw();

    eyelidRight.update();
    eyelidRight.draw();

    if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }

    if (params.mouthType === "mouth1") {
        let barSpacing: number = 0;
        let barWidth: number = 1;
        let barMaxHeight: number = 70;

        ctx.save();
        ctx.fillStyle = "red";
        for (let i: number = 10; i < audioData.length + 10; i++) {
            ctx.fillRect(
                (canvasWidth / 2) - ((i - 10) * (barWidth + barSpacing)),
                300 - ((audioData[i] / 255) * barMaxHeight),
                barWidth,
                ((audioData[i] * 2 / 255) * barMaxHeight)
            );

            ctx.fillRect(
                (canvasWidth / 2) + ((i - 10) * (barWidth + barSpacing)),
                300 - ((audioData[i] / 255) * barMaxHeight),
                barWidth,
                ((audioData[i] * 2 / 255) * barMaxHeight)
            );
        }

        ctx.restore();
    } else if (params.mouthType === "mouth2") {
        let maxHeight: number = 30;
        ctx.save();
        ctx.strokeStyle = "purple";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(400 - audioData.length, 300);
        for (let i: number = 0; i < audioData.length; i += 3) {
            console.log(audioData[audioData.length - i]);
            if (i % 2 === 0) {
                ctx.lineTo(400 - audioData.length + i, 300 - (audioData[audioData.length - i] * maxHeight / 255));
            }
            else {
                ctx.lineTo(400 - audioData.length + i, 300 + (audioData[audioData.length - i] * maxHeight / 255));
            }
        }
        for (let i: number = 0; i < audioData.length; i += 3) {
            if (i % 2 === 0) {
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

export { setupCanvas, draw };