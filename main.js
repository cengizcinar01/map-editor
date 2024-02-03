function toggleDisplay(contentId) {
    ['place', 'style', 'text', 'size'].forEach((id) => {
        document.getElementById(id).style.display = id === contentId ? 'block' : 'none';
    });
}

function updateNavButtons(contentId) {
    document.querySelectorAll('.nav-btn, .nav-btn-selected').forEach((button) => {
        const buttonIdSuffix = button.id.match(/nav(.*)/)[1].toLowerCase();
        const isSelected = buttonIdSuffix === contentId;
        button.classList.toggle('nav-btn-selected', isSelected);
        button.classList.toggle('nav-btn', !isSelected);

        const iconId = isSelected ? contentId : buttonIdSuffix;
        button.querySelector('.nav-icon').src = `assets/img/${iconId}${isSelected ? '-selected' : ''}.svg`;
    });
}

function showContent(contentId) {
    toggleDisplay(contentId);
    updateNavButtons(contentId);
}

document.addEventListener('DOMContentLoaded', () => showContent('place'));

['Place', 'Style', 'Text', 'Size'].forEach((content) => {
    document.getElementById(`nav${content}`).addEventListener('click', () => showContent(content.toLowerCase()));
});
