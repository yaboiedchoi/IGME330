// Import functions from api.js and ui.js
import { getData } from "./api";
import { renderResults, showError, clearError } from "./ui";


interface PetInfo {
  picture: string,
  name: string,
  breed: string,
  location: string
}
   // ADD TWO LINES OF CODE HERE TO IMPORT THE getData FUNCTION from api.js
   // AND THE THREE FUNCTIONS IN ui.js


// Get references to the dropdown and button
const creatureTypeSelect = document.querySelector("#creatureType") as HTMLSelectElement;
const getDataButton = document.querySelector("#getDataButton") as HTMLButtonElement;

// Set up event listener for the "Get Data" button
getDataButton.addEventListener("click", () => {
  const selectedType: string = creatureTypeSelect.value; // Get the selected type
  clearError(); // Clear any existing error messages

  // Fetch data for the selected type
  getData(
    selectedType,
    (data) => {
      renderResults(data); // Render the results on success
    },
    (errorMessage) => {
      showError(errorMessage); // Show an error message on failure
    }
  );
});
