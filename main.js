var map = L.map('map', {
    minZoom: 9,
    maxZoom: 14,
}).setView([38.912753, -77.032194], 15);

var gl = L.mapboxGL({
    style: 'https://tile.mapservice.xyz/styles/midnight/style.json',
}).addTo(map);

function showContent(contentId) {
    var contents = ['place', 'style', 'text', 'size'];

    contents.forEach(function (id) {
        var displayStyle = id === contentId ? 'block' : 'none';
        document.getElementById(id).style.display = displayStyle;
    });

    document.querySelectorAll('.nav-btn, .nav-btn-selected').forEach((button) => {
        if (button.id === 'nav' + contentId.charAt(0).toUpperCase() + contentId.slice(1)) {
            button.classList.add('nav-btn-selected');
            button.classList.remove('nav-btn');
            button.querySelector('.nav-icon').src = `assets/img/${contentId}-selected.svg`;
        } else {
            button.classList.add('nav-btn');
            button.classList.remove('nav-btn-selected');
            var unselectedContentId = button.id.replace('nav', '').toLowerCase();
            button.querySelector('.nav-icon').src = `assets/img/${unselectedContentId}.svg`;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    showContent('place');
});

['Place', 'Style', 'Text', 'Size'].forEach(function (content) {
    document.getElementById('nav' + content).addEventListener('click', function () {
        showContent(content.toLowerCase());
    });
});
