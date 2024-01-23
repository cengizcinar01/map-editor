const map = L.map('map', { minZoom: 9, maxZoom: 14 }).setView([38.912753, -77.032194], 15);

L.mapboxGL({ style: 'https://tile.mapservice.xyz/styles/midnight/style.json' }).addTo(map);

document.getElementById('searchPlace').addEventListener('input', (e) => searchLocation(e.target.value));

const searchLocation = async (query) => {
    try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        updateSearchResults(data.features);
    } catch (err) {
        console.error(err);
    }
};

const updateSearchResults = (results) => {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    results.slice(0, 10).forEach(({ properties: { name }, geometry: { coordinates } }) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.textContent = name;
        resultItem.onclick = () => map.setView([coordinates[1], coordinates[0]], 15);
        resultsContainer.appendChild(resultItem);
    });
};
    