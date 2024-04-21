// Get the results container element
var resultsDiv = document.getElementById('results');

// Search button event listener
document.querySelector('.search-button').addEventListener('click', function() {
    // Get and convert search input to lowercase
    var searchInput = document.querySelector('.search-input').value.toLowerCase();
    // Call displayResults function with search input
    displayResults(searchInput);
});

// Clear button event listener
document.querySelector('.clear-button').addEventListener('click', function() {
    // Call clearResults function with results container
    clearResults(resultsDiv);
});

// Search input keydown event listener
document.querySelector('.search-input').addEventListener('keydown', function(event) {
    // If Enter key is pressed
    if (event.keyCode === 13) {
        // Prevent default behavior
        event.preventDefault();
        // Get and convert search input to lowercase
        var searchInput = this.value.toLowerCase();
        // Call displayResults function with search input
        displayResults(searchInput);
    }
});

// Function to display search results
function displayResults(keyword) {
    // Clear previous search results
    resultsDiv.innerHTML = '';

    // Fetch data from travel_recommendation_api.json
    fetch('travel_recommendation_api.json')
        .then(response => {
            // Check if response is ok
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse response as JSON
            return response.json();
        })
        .then(data => {
            // Filter data based on keyword
            var filteredData = data.countries.filter(country => country.name.toLowerCase().includes(keyword));
            if (filteredData.length > 0) {
                // Display filtered data
                displayData(filteredData);
            } else {
                // Check for specific keywords
                if (keyword === 'temples' || keyword === 'temple') {
                    displayData(data.temples);
                } else if (keyword === 'beaches' || keyword === 'beach') {
                    displayData(data.beaches);
                } else {
                    // Filter temples and beaches by keyword
                    var filteredTemples = data.temples.filter(temple => temple.name.toLowerCase().includes(keyword));
                    var filteredBeaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(keyword));
                    // Display filtered data
                    displayData(filteredTemples);
                    displayData(filteredBeaches);
                }
            }
        })
        .catch(error => {
            // Log fetch error
            console.error('There was a problem with the fetch operation:', error);
        });

    // Function to display data
    function displayData(filteredData) {
        // Create and append search results
        var searchresults = document.createElement('p');
        searchresults.textContent = filteredData.length + " total results were found matching '" + document.querySelector('.search-input').value + "'";
        resultsDiv.appendChild(searchresults);
        // Display each item in filtered data
        filteredData.forEach(item => {
            var header = document.createElement('h3');
            var paragraph = document.createElement('p');
            var horizontal_line = document.createElement('hr');
            var image = document.createElement('img');
            image.src = item.imageUrl;
            header.textContent = item.name;
            paragraph.textContent = item.description;
            resultsDiv.appendChild(horizontal_line);
            resultsDiv.appendChild(header);
            resultsDiv.appendChild(image);
            resultsDiv.appendChild(paragraph);
        });
    }
}

// Function to clear search results
function clearResults(resultsDiv) {
    resultsDiv.innerHTML = "";
}
