// script.js
const buttons = document.querySelectorAll('nav button');
const iframe = document.getElementById('iframe-content');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const page = button.getAttribute('data-page');
        iframe.src = `pages/${page}`;
    });
});
