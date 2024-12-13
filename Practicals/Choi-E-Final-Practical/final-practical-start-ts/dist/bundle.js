/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.ts":
/*!********************!*\
  !*** ./src/api.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData)
/* harmony export */ });
// Fetches data from the Adoptable Creatures API
// - type: The type of creature to fetch (e.g., "cats", "dogs", "dragons")
// - callback: Function to run with the fetched data if successful
// - errorCallback: Function to run with an error message if the request fails
function getData(type, callback, errorCallback) {
    var API_URL = "https://people.rit.edu/anwigm/330/practical/api.php";
    // USING XML
    // const xhr = new XMLHttpRequest();
    // // Open a GET request to the API
    // xhr.open("GET", `${API_URL}?type=${type}`, true);
    // // Handle the API response
    // xhr.onload = function () {
    //   if (xhr.status >= 200 && xhr.status < 300) {
    //     try {
    //       // Parse the response and call the success callback
    //         // YOU FILL IN THE CODE HERE TO PARSE THE RESPONSE AND
    //         // STORE IT IN THE VARIABLE data.
    //         const data = JSON.parse(xhr.responseText);
    //       callback(data);
    //     } catch (err) {
    //       // Handle JSON parsing errors
    //       errorCallback("Error parsing data from the server.");
    //     }
    //   } else {
    //     // Handle HTTP errors
    //     errorCallback("Error fetching data from the server.");
    //   }
    // };
    // // Handle network errors
    // xhr.onerror = function () {
    //   errorCallback("Network error occurred while fetching data.");
    // };
    // // Send the request
    // xhr.send();
    // USING FETCH
    // try {
    //   // fetch
    //   const response = await fetch(`${API_URL}?type=${type}`);
    //   // get data
    //   const data = await response.json();
    //   // check if response was okay
    //   if (!response.ok) {
    //     // throw error message
    //     console.error(data.message);
    //     errorCallback("Error with reading json: ", data.message)
    //   }
    //   // callback
    //   console.log("success");
    //   callback(data);
    // }
    // // if there is a problem
    // catch (error) {
    //   // callback error message
    //   console.error(error);
    //   errorCallback("Error fetching data from server: ", error);
    // }
    // ts cant use await/async
    fetch("".concat(API_URL, "?type=").concat(type))
        .then(function (response) {
        // check if response is okay
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
        .then(function (data) {
        // callback
        callback(data);
    }) // if error
        .catch(function (error) {
        console.error(error);
        errorCallback("Error fetching data: " + error.message);
    });
}


/***/ }),

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearError: () => (/* binding */ clearError),
/* harmony export */   renderResults: () => (/* binding */ renderResults),
/* harmony export */   showError: () => (/* binding */ showError)
/* harmony export */ });
function renderResults(data) {
    var resultsContainer = document.querySelector("#results");
    resultsContainer.innerHTML = '<div class="column is-one-quarter">'; // Clear existing results
    data.forEach(function (item) {
        var card = document.createElement("div");
        card.className = "result-card";
        // Add content to the card
        // card.innerHTML = `<div class="card">
        //   <img src="${item.picture}" alt="${item.name}" class="card-image">
        //   <h2>${item.name}</h2>
        //   <p><strong>Breed:</strong> ${item.breed}</p>
        //   <p><strong>Location:</strong> ${item.location}</p>
        //   </div>
        // `;
        // bulma
        card.innerHTML = "\n        <div class=\"card\">\n          <div class=\"card-image\">\n            <img src=\"".concat(item.picture, "\" alt=\"").concat(item.name, "\" class=\"image is-square\">\n          </div>\n          <div class=\"card-content\">\n            <div class=\"media\">\n              <div class=\"media-content\">\n                <p class=\"title is-4\">").concat(item.name, "</p>\n                <p class=\"subtitle is-6\"><strong>Breed: </strong>").concat(item.breed, "</p>\n              </div>\n              <div class=\"content\">\n                <strong>Location: </strong>").concat(item.location, "\n              </div>\n            </div>\n          </div>\n        </div>\n      ");
        // ADD THE LINE OF CODE HERE THAT WILL ADD THE CARD 
        // TO END OF THE RESULTS CONTAINER
        resultsContainer.innerHTML += card.innerHTML;
    });
    resultsContainer.innerHTML += '</div>';
}
// Displays an error message on the page
// - message: The error message to show
function showError(message) {
    var errorMessage = document.querySelector("#errorMessage");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden"); // Make the error visible
}
// Clears any visible error message from the page
function clearError() {
    var errorMessage = document.querySelector("#errorMessage");
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden"); // Hide the error
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/api.ts");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ "./src/ui.ts");
// Import functions from api.js and ui.js


// ADD TWO LINES OF CODE HERE TO IMPORT THE getData FUNCTION from api.js
// AND THE THREE FUNCTIONS IN ui.js
// Get references to the dropdown and button
var creatureTypeSelect = document.querySelector("#creatureType");
var getDataButton = document.querySelector("#getDataButton");
// Set up event listener for the "Get Data" button
getDataButton.addEventListener("click", function () {
    var selectedType = creatureTypeSelect.value; // Get the selected type
    (0,_ui__WEBPACK_IMPORTED_MODULE_1__.clearError)(); // Clear any existing error messages
    // Fetch data for the selected type
    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getData)(selectedType, function (data) {
        (0,_ui__WEBPACK_IMPORTED_MODULE_1__.renderResults)(data); // Render the results on success
    }, function (errorMessage) {
        (0,_ui__WEBPACK_IMPORTED_MODULE_1__.showError)(errorMessage); // Show an error message on failure
    });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map