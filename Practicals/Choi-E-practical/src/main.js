// add module connection code here so that both the 
// readAppData (from dataReader.js) and drawShape 
// (from utils.js -- which you'll write) functions are
// available to the code below.
// import helper methods from other js files
import {readAppData} from './dataReader.js';
import {drawShape} from './utils.js';

const canvas = document.querySelector('#canvas');
// add code here to get the canvas 2d context as ctx
const ctx = canvas.getContext('2d');

const nameHeading = document.querySelector("h1");
const shapeSelector = document.querySelector('#shapeSelector');

let shapes = {};
// the following code (if added to main.js after the shapes object
// is initialized) should draw a capital A to your canvas...
// it could be useful for testing your drawShape function.
// test code
// shapes = {"a":[
//   [200, 150, 250, 250],
//   [200, 150, 150, 250],
//   [175, 200, 225, 200]
// ]}
// drawShape(ctx, shapes["a"]);

// Load all app & shape data once when the page loads
readAppData((data) => {
  // add code here to take the data from the json
  // and then store the shape data in the shapes object
  // and set the app name using what you added to the data.json

  // set the name of the program
  nameHeading.innerText = data.name;
  shapes = data.shapes;
});

// Listen to shape selection changes
// no changes here.
shapeSelector.addEventListener('change', () => {
  const selectedShape = shapeSelector.value;
  if (selectedShape && shapes[selectedShape]) {
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the selected shape using the pre-loaded data
    drawShape(ctx, shapes[selectedShape]);
  }
});
