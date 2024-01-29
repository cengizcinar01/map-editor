const map = L.map('map', {
    minZoom: 9,
    maxZoom: 14,
    zoomSnap: 0.1,
    wheelPxPerZoomLevel: 60,
}).setView([52.502879, 13.409609], 10.5);

let currentLayer;

function changeMapStyle(styleUrl) {
    if (currentLayer) {
        map.removeLayer(currentLayer);
    }
    currentLayer = L.mapboxGL({ style: styleUrl }).addTo(map);
}

document.addEventListener('DOMContentLoaded', function () {
    changeMapStyle('https://tile.mapservice.xyz/styles/midnight/style.json');
    document.getElementById('elegantStyle').addEventListener('click', function () {
        changeMapStyle('https://tile.mapservice.xyz/styles/elegant/style.json');
    });
    document.getElementById('midnightStyle').addEventListener('click', function () {
        changeMapStyle('https://tile.mapservice.xyz/styles/midnight/style.json');
    });
});

map.on('moveend', function () {
    var center = map.getCenter();
    console.log(`[${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}], Zoom: ${map.getZoom()}`);
});

document.getElementById('searchPlace').addEventListener('input', (e) => searchLocation(e.target.value));

const searchLocation = async (query) => {
    try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&osm_tag=place`);
        const data = await response.json();
        updateSearchResults(data.features);
    } catch (err) {
        console.error(err);
    }
};

const updateSearchResults = (results) => {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    results.slice(0, 10).forEach(({ properties: { name, osm_key, countrycode }, geometry: { coordinates } }) => {
        if (name && name.length >= 3 && osm_key === 'place') {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';

            if (countrycode) {
                const flagImg = document.createElement('img');
                flagImg.src = `https://flagcdn.com/16x12/${countrycode.toLowerCase()}.png`;
                flagImg.alt = `Flagge von ${countrycode}`;
                flagImg.className = 'flag-image';
                resultItem.appendChild(flagImg);
            }

            const nameText = document.createTextNode(name);
            resultItem.appendChild(nameText);

            resultItem.onclick = () => {
                document.querySelectorAll('.search-result-item').forEach((el) => {
                    el.classList.remove('search-result-item-selected');
                });

                resultItem.classList.add('search-result-item-selected');

                map.setView([coordinates[1], coordinates[0]], 11);
            };

            resultsContainer.appendChild(resultItem);
        }
    });
};
