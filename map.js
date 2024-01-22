var map = L.map('map', {
    minZoom: 9,
    maxZoom: 14,
}).setView([38.912753, -77.032194], 15);

var gl = L.mapboxGL({
    style: 'https://tile.mapservice.xyz/styles/midnight/style.json',
}).addTo(map);

document.getElementById('searchPlace').addEventListener('input', function (e) {
    var searchQuery = e.target.value;
    searchLocation(searchQuery);
});

function searchLocation(query) {
    fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => {
            updateSearchResults(data.features);
        })
        .catch((err) => console.error(err));
}

function updateSearchResults(results) {
    var resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    results.slice(0, 10).forEach((result) => {
        var resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.textContent = result.properties.name;
        resultItem.onclick = function () {
            map.setView([result.geometry.coordinates[1], result.geometry.coordinates[0]], 15);
        };
        resultsContainer.appendChild(resultItem);
    });
}
