// Updates the DOM to display the fetched data
// - data: An array of objects containing creature details
interface PetInfo {
  picture: string,
  name: string,
  breed: string,
  location: string
}

export function renderResults(data) {
    const resultsContainer = document.querySelector("#results") as HTMLElement;
    resultsContainer.innerHTML = '<div class="column is-one-quarter">'; // Clear existing results
  
    data.forEach((item: PetInfo) => {
      const card = document.createElement("div") as HTMLElement;
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
      card.innerHTML = `
        <div class="card">
          <div class="card-image">
            <img src="${item.picture}" alt="${item.name}" class="image is-square">
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">${item.name}</p>
                <p class="subtitle is-6"><strong>Breed: </strong>${item.breed}</p>
              </div>
              <div class="content">
                <strong>Location: </strong>${item.location}
              </div>
            </div>
          </div>
        </div>
      `;
  
        // ADD THE LINE OF CODE HERE THAT WILL ADD THE CARD 
        // TO END OF THE RESULTS CONTAINER
        resultsContainer.innerHTML += card.innerHTML;
      
    });
    resultsContainer.innerHTML += '</div>';
  }
  
  // Displays an error message on the page
  // - message: The error message to show
  export function showError(message: string): void {
    const errorMessage = document.querySelector("#errorMessage") as HTMLElement;
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden"); // Make the error visible
  }
  
  // Clears any visible error message from the page
  export function clearError(): void {
    const errorMessage = document.querySelector("#errorMessage") as HTMLElement;
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden"); // Hide the error
  }
  