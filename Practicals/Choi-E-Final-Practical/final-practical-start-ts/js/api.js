// Fetches data from the Adoptable Creatures API
// - type: The type of creature to fetch (e.g., "cats", "dogs", "dragons")
// - callback: Function to run with the fetched data if successful
// - errorCallback: Function to run with an error message if the request fails
export async function getData(type, callback, errorCallback) {
    const API_URL = "https://people.rit.edu/anwigm/330/practical/api.php";
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
    try {
      // fetch
      const response = await fetch(`${API_URL}?type=${type}`);

      // get data
      const data = await response.json();

      // check if response was okay
      if (!response.ok) {
        // throw error message
        console.error(data.message);
        errorCallback("Error with reading json: ", data.message)
      }
      
      // callback
      console.log("success");
      callback(data);
    }
    // if there is a problem
    catch (error) {
      // callback error message
      console.error(error);
      errorCallback("Error fetching data from server: ", error);
    }
  }
  
  