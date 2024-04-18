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
            var filteredCountries = data.countries.filter(country => country.name.toLowerCase().includes(keyword));
            if (filteredCountries.length > 0) {
                filteredCountries.forEach(country => {
                    displayData(country.cities);
                });
            } else {
                if (keyword === 'temples' || keyword === 'temple') {
                    displayData(data.temples);
                } else if (keyword === 'beaches' || keyword === 'beach') {
                    displayData(data.beaches);
                } else {
                    var filteredTemples = data.temples.filter(temple => temple.name.toLowerCase().includes(keyword));
                    var filteredBeaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(keyword));
                    displayData(filteredTemples);
                    displayData(filteredBeaches);
                }
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    function displayData(filteredData) {
        var searchresults = document.createElement('p');
        searchresults.textContent = filteredData.length + " total results were found matching '" + document.querySelector('.search-input').value + "'";
        resultsDiv.appendChild(searchresults);
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

function clearResults(resultsDiv) {
    resultsDiv.innerHTML = ""
}