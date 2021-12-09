/* eslint-disable no-alert */
/* global alert, document */
[...document.querySelectorAll('.c-button')].forEach((button) => {
    button.addEventListener('click', (ev) => {
        alert(ev.currentTarget.textContent);
    });
});
