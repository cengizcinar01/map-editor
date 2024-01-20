var map = L.map('map', {
    minZoom: 9,
    maxZoom: 14 
}).setView([38.912753, -77.032194], 15);

var gl = L.mapboxGL({
    style: 'https://tile.mapservice.xyz/styles/midnight/style.json',
}).addTo(map);
