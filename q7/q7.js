const fetch = require('node-fetch');
async function fetchGooglePage() {
  try {
    const response = await fetch('https://www.google.com');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const html = await response.text(); // Get the HTML content
    console.log(html); // Display the HTML in console
  } catch (error) {
    console.error('Error fetching Google page:', error.message);
  }
}

// Call the function
fetchGooglePage();