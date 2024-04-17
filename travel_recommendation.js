document.querySelector('.search-button').addEventListener('click', function() {
    // Get the search input value and convert to lowercase
    var searchInput = document.querySelector('.search-input').value.toLowerCase();

    // Call function to display results based on keyword
    displayResults(searchInput);
});

function displayResults(keyword) {
    // Fetch JSON data from API
    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if keyword matches "countries", "temples", or "beaches" exactly
            if (keyword === 'countries' || keyword === 'country') {
                console.log(data.countries);
                return;
            } else if (keyword === 'temples' || keyword === 'temple') {
                console.log(data.temples);
                return;
            } else if (keyword === 'beaches' || keyword === 'beach') {
                console.log(data.beaches);
                return;
            }

            // Filter countries, temples, and beaches based on partial matches in names
            var filteredCountries = data.countries.filter(country => country.name.toLowerCase().includes(keyword));
            var filteredTemples = data.temples.filter(temple => temple.name.toLowerCase().includes(keyword));
            var filteredBeaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(keyword));

            // Display filtered results
            console.log(filteredCountries);
            console.log(filteredTemples);
            console.log(filteredBeaches);
        })
        .catch(error => {
            // Handle errors that occur during the fetch request
            console.error('There was a problem with the fetch operation:', error);
        });
}