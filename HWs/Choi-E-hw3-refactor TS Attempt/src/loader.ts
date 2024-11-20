import * as main from "./main";
import * as utils from "./utils";
import * as audio from "./audio";
import {DEFAULTS} from "./enums/main-defaults.enum";

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
		(document.querySelector("#title") as HTMLElement).innerHTML = json.title;
	  
		// volume
		// console.log(json["default-slider-values"].volume);
		(document.querySelector("#volume-slider") as HTMLInputElement).value = json["default-values"].volume;
		(document.querySelector("#volume-label") as HTMLElement).innerHTML = Math.round(json["default-values"].volume / 2 * 100).toString();
		
		let volumeSlider = document.querySelector("#volume-slider") as HTMLInputElement;
		let volumeLabel = document.querySelector("#volume-label") as HTMLElement;
		// add .oninput event to slider
		volumeSlider.oninput = e => {
			const target = e.target as HTMLInputElement;
		  // set the gain
		  audio.setVolume(target.value);
		  // update the label to match the value
		  volumeLabel.innerHTML = Math.round((Number(target.value)/2 * 100)).toString();
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