import * as audio from './audio';
import * as utils from './utils';
import * as canvas from './canvas';

interface DrawParams {
  showGradient: boolean;
  showBars: boolean;
  showCircles: boolean;
  showNoise: boolean;
  showInvert: boolean;
  showEmboss: boolean;
  byteFreq: boolean;
  mouthType: string;
  voiceType: string;
}

const drawParams: DrawParams = {
  showGradient: false,
  showBars: true,
  showCircles: false,
  showNoise: false,
  showInvert: false,
  showEmboss: false,
  byteFreq: true,
  mouthType: "mouth1",
  voiceType: "voice2",
}

const fps: number = 60;

let json: any;

let audioPathList: string[] = [];

const DEFAULTS: { [key: string]: string } = {};

utils.readAppData((jsonData: any) => {
  DEFAULTS.sound1 = jsonData["audio"]["1"]["path"];
  DEFAULTS.sound2 = jsonData["audio"]["1"]["path"];
  DEFAULTS.sound3 = jsonData["audio"]["1"]["path"];

  document.title = jsonData.title;
  (document.querySelector("#title") as HTMLInputElement).innerHTML = jsonData.title;

  (document.querySelector("#volume-slider") as HTMLInputElement).value = jsonData["default-values"].volume;
  (document.querySelector("#volume-label") as HTMLLabelElement).innerHTML = `${Math.round(jsonData["default-values"].volume / 2 * 100)}`;
  
  const volumeSlider: HTMLInputElement = document.querySelector("#volume-slider") as HTMLInputElement;
  const volumeLabel: HTMLElement = document.querySelector("#volume-label") as HTMLElement;

  volumeSlider.oninput = (e: Event) => {
    audio.setVolume((e.target as HTMLInputElement).value);
    volumeLabel.innerHTML = `${Math.round(100 * (Number((e.target as HTMLInputElement).value)) / 2)}`;
  }

  for (let key in jsonData["audio"]) {
    DEFAULTS["sound" + key] = jsonData["audio"][key]["path"];
  }
  console.log(DEFAULTS);
})

const init = (): void => {
  console.log("init called");
  console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  audio.setupWebAudio(DEFAULTS.sound1);
  const canvasElement: HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode);

  loop();
}

const setupUI = (canvasElement: HTMLCanvasElement): void => {
  // setup navbar
  const burgerIcon = document.querySelector('#burger') as HTMLElement;
  const navbarMenu = document.querySelector('#nav-links') as HTMLElement;

  burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
  });
  
  const fsButton: HTMLElement = document.querySelector("#fs-btn") as HTMLElement;

  fsButton.onclick = (e: MouseEvent) => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  const playButton: HTMLElement = document.querySelector("#play-btn") as HTMLElement;
  playButton.onclick = (e: MouseEvent) => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    if (audio.audioCtx.state === "suspended") {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if ((e.target as HTMLElement).dataset.playing === "no") {
      audio.playCurrentSound();
      (e.target as HTMLElement).dataset.playing = "yes";
    } else {
      audio.pauseCurrentSound();
      (e.target as HTMLElement).dataset.playing = "no";
    }

    const volumeSlider: HTMLInputElement = document.querySelector("#volume-slider") as HTMLInputElement;
    volumeSlider.dispatchEvent(new Event("input"));

    const trackSelect: HTMLSelectElement = document.querySelector("#track-select") as HTMLSelectElement;
    trackSelect.onchange = (e: Event) => {
      audio.loadSoundFile((e.target as HTMLSelectElement).value);
      if (playButton.dataset.playing === "yes") {
        playButton.dispatchEvent(new MouseEvent("click"));
      }
    }
  }

  const useByteFrequencyDataCheckbox: HTMLInputElement = document.querySelector("#byte-freq") as HTMLInputElement;
  useByteFrequencyDataCheckbox.onchange = (e: Event) => {
    drawParams.byteFreq = (e.target as HTMLInputElement).checked;
  }

  const mouthTypeSelect: HTMLSelectElement = document.querySelector("#mouth-select") as HTMLSelectElement;
  mouthTypeSelect.onchange = (e: Event) => {
    drawParams.mouthType = (e.target as HTMLSelectElement).value;
  }

  const voiceTypeSelect: HTMLSelectElement = document.querySelector("#voice-select") as HTMLSelectElement;
  voiceTypeSelect.onchange = (e: Event) => {
    drawParams.voiceType = (e.target as HTMLSelectElement).value;
    console.log(drawParams.voiceType);
    switch (drawParams.voiceType) {
      case "voice1":
        toggleHighshelf(false);
        toggleLowshelf(true);
        break;
      case "voice2":
        toggleLowshelf(false);
        toggleHighshelf(false);
        break;
      case "voice3":
        toggleLowshelf(false);
        toggleHighshelf(true);
        break;
    }
  }
}

const loop = (): void => {
  setTimeout(loop, 1000 / fps);
  canvas.draw(drawParams);
}

const toggleHighshelf = (status: boolean): void => {
  if (status) {
    console.log("highshelf on");
    audio.biquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
    audio.biquadFilter.gain.setValueAtTime(10, audio.audioCtx.currentTime);
    audio.lowShelfBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
    audio.lowShelfBiquadFilter.gain.setValueAtTime(-20, audio.audioCtx.currentTime);
  } else {
    console.log("highshelf off");
    audio.biquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
    audio.lowShelfBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
  }
}

const toggleLowshelf = (status: boolean): void => {
  if (status) {
    console.log("lowshelf on");
    audio.biquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
    audio.biquadFilter.gain.setValueAtTime(-20, audio.audioCtx.currentTime);
    audio.lowShelfBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
    audio.lowShelfBiquadFilter.gain.setValueAtTime(10, audio.audioCtx.currentTime);
  } else {
    console.log("lowshelf off");
    audio.biquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
    audio.lowShelfBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
  }
}

export { init };