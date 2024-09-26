import { getRandomColor, getRandomInt } from "./utils.js";
import { drawRectangle, drawArc, drawLine, drawRandomArc, drawRandomLine, drawRandomRect } from "./canvas-utils.js";

let ctx;
let paused = false;
let createRectangles = true;
let drawArcs = false;
let drawLines = false;

const update = () => {
	if(!paused)
		requestAnimationFrame(update);

	// tested - all work
	if (createRectangles)
		drawRandomRect(ctx);

	if (drawArcs)
		drawRandomArc(ctx);

	if (drawLines)
		drawRandomLine(ctx);
}
		
const canvasClicked = (e) => {
	let rect = e.target.getBoundingClientRect();
	let mouseX = e.clientX - rect.x;
 	let mouseY = e.clientY - rect.y;
	console.log(mouseX,mouseY);
          
	for (let i = 0; i < 10; i++) {
		drawRectangle(ctx,
                      getRandomInt(mouseX - 25, mouseX + 25), 
					  getRandomInt(mouseY - 25, mouseY + 25), 
					  getRandomInt(10, 25), 
					  getRandomInt(10, 25), 
					  getRandomColor(), 
					  1, 
					  "white");
	}
		  
}

const init = () => {
	console.log("page loaded!");
	// #2 Now that the page has loaded, start drawing!
			
	// A - `canvas` variable points at <canvas> tag
	let canvas = document.querySelector("canvas");
			
	// B - the `ctx` variable points at a "2D drawing context"
	ctx = canvas.getContext("2d");

	// background with helper methods
	drawRectangle(ctx,320,240,640,480,"black",30,"white");

	document.querySelector("canvas").onclick = canvasClicked;
	document.querySelector("#btn-play").onclick = () => {
		if (paused) {
			paused = false;
			update();
		}
	}
    document.querySelector("#btn-pause").onclick = () => paused = true;

	document.querySelector("#cb-rectangles").onchange = (e) => createRectangles = e.target.checked;
	document.querySelector("#draw-arcs").onchange = (e) => drawArcs = e.target.checked;
	document.querySelector("#draw-lines").onchange = (e) => drawLines = e.target.checked;

	document.querySelector("#btn-clear").onclick = () => drawRectangle(ctx,320,240,640,480,"black",30,"white");

	update();
}

init();