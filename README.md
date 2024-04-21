# Travel Recommendations Website

This website provides travel recommendations based on user input. It demonstrates how to pull and parse JSON data into a web interface for display to users.

## Usage

1. Enter a search keyword in the search input field.
2. Click the search button or press Enter.
3. The website will display recommendations based on the search keyword.

## Features

- **Search**: Users can search for travel recommendations using keywords. (Keywords include: beaches, temples, country names eg. (Japan, Brazil, Australia)
- **Display**: Results are displayed in an organized manner with images and descriptions.
- **Clear**: Users can clear the search results by clicking the clear button.

## Implementation

The website utilizes JavaScript to fetch data from a JSON file (`travel_recommendation_api.json`) and parse it to display recommendations based on user input.

```javascript
var resultsDiv = document.getElementById('results');

document.querySelector('.search-button').addEventListener('click', function() {
    var searchInput = document.querySelector('.search-input').value.toLowerCase();
    displayResults(searchInput);
});

document.querySelector('.clear-button').addEventListener('click', function() {
    clearResults(resultsDiv);
});

document.querySelector('.search-input').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        var searchInput = this.value.toLowerCase();
        displayResults(searchInput);
    }
});

function displayResults(keyword) {
    resultsDiv.innerHTML = ''; // Clear previous results

    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Logic to filter and display data
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    function displayData(filteredData) {
        // Logic to display data
    }
}

function clearResults(resultsDiv) {
    resultsDiv.innerHTML = "";
}
