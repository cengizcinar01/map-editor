const map = L.map('map', {
    minZoom: 9,
    maxZoom: 14,
    zoomSnap: 0.1,
    wheelPxPerZoomLevel: 60,
}).setView([52.502879, 13.409609], 10.5);

let currentLayer;

const changeMapStyle = (styleUrl) => {
    if (currentLayer) map.removeLayer(currentLayer);
    currentLayer = L.mapboxGL({ style: styleUrl }).addTo(map);
};

document.addEventListener('DOMContentLoaded', () => {
    const styles = ['elegant', 'midnight'];
    const changeMapStyleTo = (style) => changeMapStyle(`https://tile.mapservice.xyz/styles/${style}/style.json`);
    changeMapStyleTo('midnight');
    styles.forEach((style) => {
        document.getElementById(`${style}Style`).addEventListener('click', () => changeMapStyleTo(style));
    });
});

map.on('moveend', function () {
    var center = map.getCenter();
    console.log(`[${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}], Zoom: ${map.getZoom()}`);
});

const locations = {
    London: [51.5074, -0.1278],
    Rome: [41.9028, 12.4964],
    Paris: [48.8566, 2.3522],
    Istanbul: [41.0082, 28.9784],
    Barcelona: [41.3851, 2.1734],
    Miami: [25.7617, -80.1918],
    Florence: [43.7696, 11.2558],
};

const selectPlace = (selectedElement) => {
    document.querySelectorAll('.search-result-item-selected').forEach((el) => el.classList.remove('search-result-item-selected'));
    selectedElement.classList.add('search-result-item-selected');
};

document.querySelectorAll('.fav-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const placeName = button.textContent.trim();
        const location = locations[placeName];
        if (location) {
            map.setView(location, 11);
            selectPlace(button);
        }
    });
});

document.getElementById('searchPlace').addEventListener('input', (e) => {
    document.getElementById('favoritePlaces').style.display = e.target.value.length > 0 ? 'none' : '';
});

document.getElementById('searchPlace').addEventListener('input', (e) => searchLocation(e.target.value));

const updateSearchResults = (results, query) => {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (query && query.length < 3) {
        const message = document.createElement('div');
        message.className = 'search-result-item';
        message.textContent = 'Please enter at least 3 letters';
        resultsContainer.appendChild(message);
    } else {
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
                    map.setView([coordinates[1], coordinates[0]], 11);
                    selectPlace(resultItem);
                };

                resultsContainer.appendChild(resultItem);
            }
        });
    }
};

const searchLocation = async (query) => {
    try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&layer=city&layer=district`);
        const data = await response.json();
        updateSearchResults(data.features, query);
    } catch (err) {
        console.error(err);
    }
};

document.querySelector('.generate').addEventListener('click', function () {
    let currentStyle = 'midnight';

    let center = map.getCenter();
    let zoom = map.getZoom();

    let adjustedZoom = zoom + 2.95;

    let url = `http://127.0.0.1:3000/img?design=$2&style=${currentStyle}&size=A1&square=true&display=inline&place=miami&user=test&lng=${center.lng}&lat=${center.lat}&zoom=${adjustedZoom}`;

    window.open(url, '_blank');
});
