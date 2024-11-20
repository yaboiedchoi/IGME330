const DEFAULTS = {};

import * as main from "./main.js";
import * as utils from "./utils.js";
import * as audio from "./audio.js";

window.onload = () =>{
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	
	utils.readAppData(json => {
		console.log(json);
		// set default song paths
		DEFAULTS.sound1 = json["audio"]["1"]["path"];
		DEFAULTS.sound2 = json["audio"]["1"]["path"];
		DEFAULTS.sound3 = json["audio"]["1"]["path"];
		// set default values
	  
		// title
		document.title = json.title;
		document.querySelector("#title").innerHTML = json.title;
	  
		// volume
		// console.log(json["default-slider-values"].volume);
		document.querySelector("#volume-slider").value = json["default-values"].volume;
		document.querySelector("#volume-label").innerHTML = Math.round(json["default-values"].volume / 2 * 100);
		
		let volumeSlider = document.querySelector("#volume-slider");
		let volumeLabel = document.querySelector("#volume-label");
		// add .oninput event to slider
		volumeSlider.oninput = e => {
		  // set the gain
		  audio.setVolume(e.target.value);
		  // update the label to match the value
		  volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
		}
	  
		// path
		// console.log(json["audio"]["1"]);
		// for (let key in json["audio"]){
		//   DEFAULTS["sound" + key] = json["audio"][key]["path"];
		// }
		console.log(DEFAULTS);

		// 2 - start up app
		main.init(DEFAULTS);
	  })


}