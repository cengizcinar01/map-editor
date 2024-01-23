function showContent(contentId) {
    const contents = ['place', 'style', 'text', 'size'];

    contents.forEach((id) => {
        document.getElementById(id).style.display = id === contentId ? 'block' : 'none';
    });

    document.querySelectorAll('.nav-btn, .nav-btn-selected').forEach((button) => {
        const isCurrentButton = button.id === `nav${contentId.charAt(0).toUpperCase()}${contentId.slice(1)}`;
        button.classList.toggle('nav-btn-selected', isCurrentButton);
        button.classList.toggle('nav-btn', !isCurrentButton);

        const iconId = isCurrentButton ? contentId : button.id.replace('nav', '').toLowerCase();
        button.querySelector('.nav-icon').src = `assets/img/${iconId}${isCurrentButton ? '-selected' : ''}.svg`;
    });
}

document.addEventListener('DOMContentLoaded', () => showContent('place'));

['Place', 'Style', 'Text', 'Size'].forEach((content) => {
    document.getElementById('nav' + content).addEventListener('click', () => {
        showContent(content.toLowerCase());
    });
});
