/*jshint esversion: 6 */

const h3 = document.getElementById('sectionh3');
const section = document.querySelector('section');

function toggleHeight() {
    section.classList.toggle('close-add-match');
    if (section.classList.contains('close-add-match')) {
        h3.innerHTML = "Add Match";
    } else {
        h3.innerHTML = "Hide Input";
    }
}

section.addEventListener('click', toggleHeight);