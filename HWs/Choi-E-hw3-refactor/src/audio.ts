// 1 - WebAudio context, exported for public use
export let audioCtx: AudioContext;

// **Private properties** - not exported or accessible outside this module
let element: HTMLAudioElement;
let sourceNode: MediaElementAudioSourceNode;
let analyserNode: AnalyserNode;
let gainNode: GainNode;

// Biquad filter nodes
let biquadFilter: BiquadFilterNode;
let lowShelfBiquadFilter: BiquadFilterNode;

// 3 - Fake enumeration using a frozen object
const DEFAULTS = Object.freeze({
  gain: 0.5,
  numSamples: 256,
});

// 4 - Typed array to hold audio frequency data
let audioData: Uint8Array = new Uint8Array(DEFAULTS.numSamples / 2);

// **Public methods**
export const setupWebAudio = (filePath: string): void => {
  // 1 - AudioContext for WebAudio API
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  audioCtx = new AudioContext();

  // 2 - Create an <audio> element
  element = new Audio();

  // 3 - Load sound file into the audio element
  loadSoundFile(filePath);

  // 4 - Create a source node from the <audio> element
  sourceNode = audioCtx.createMediaElementSource(element);

  // Create high shelf biquad filter
  biquadFilter = audioCtx.createBiquadFilter();
  biquadFilter.type = "highshelf";

  // Create low shelf biquad filter
  lowShelfBiquadFilter = audioCtx.createBiquadFilter();
  lowShelfBiquadFilter.type = "lowshelf";

  // 5 - Create an analyser node
  analyserNode = audioCtx.createAnalyser();

  /*
   * We request DEFAULTS.numSamples number of samples (bins) spaced equally
   * across the sound spectrum.
   *
   * If DEFAULTS.numSamples (fftSize) is 256, bins correspond to frequencies.
   */
  analyserNode.fftSize = DEFAULTS.numSamples;

  // 7 - Create a gain (volume) node
  gainNode = audioCtx.createGain();
  gainNode.gain.value = DEFAULTS.gain;

  // 8 - Connect nodes to build the audio graph
  sourceNode.connect(biquadFilter);
  biquadFilter.connect(lowShelfBiquadFilter);
  lowShelfBiquadFilter.connect(analyserNode);

  analyserNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
};

export const loadSoundFile = (filePath: string): void => {
  element.src = filePath;
};

export const playCurrentSound = (): void => {
  element.play();
};

export const pauseCurrentSound = (): void => {
  element.pause();
};

export const setVolume = (value: number | string): void => {
  gainNode.gain.value = Number(value);
};

// Export other key nodes for external use
export {
  analyserNode,
  biquadFilter,
  lowShelfBiquadFilter,
};
