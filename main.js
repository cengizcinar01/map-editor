var map = L.map('map', {
    minZoom: 9,
    maxZoom: 14,
}).setView([38.912753, -77.032194], 15);

var gl = L.mapboxGL({
    style: 'https://tile.mapservice.xyz/styles/midnight/style.json',
}).addTo(map);

function showContent(contentId) {
    var contents = ['place', 'style', 'text', 'size'];

    contents.forEach(function(id) {
        var displayStyle = id === contentId ? 'block' : 'none';
        document.getElementById(id).style.display = displayStyle;
    });
}

document.getElementById('navPlace').addEventListener('click', function() { showContent('place'); });
document.getElementById('navStyle').addEventListener('click', function() { showContent('style'); });
document.getElementById('navText').addEventListener('click', function() { showContent('text'); });
document.getElementById('navSize').addEventListener('click', function() { showContent('size'); });

document.addEventListener('DOMContentLoaded', function() {
    showContent('place');
});
