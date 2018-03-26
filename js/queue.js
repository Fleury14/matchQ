/*jshint esversion: 6 */

const h3 = document.getElementById('sectionh3');
const section = document.querySelector('section');
const activeButton = document.getElementById('activeToggle');
const activeStatus = document.getElementById('activeStatus');
let isActive = true;

function toggleHeight() {
    section.classList.toggle('close-add-match');
    if (section.classList.contains('close-add-match')) {
        h3.innerHTML = "Add Match";
    } else {
        h3.innerHTML = "Hide Input";
    }
}

function toggleActive() {
    if (isActive === true) {
        activeStatus.classList.remove('success');
        activeStatus.style.opacity = 0;
        setTimeout(() => {
            activeStatus.style.opacity = 1;
            activeStatus.classList.add('danger');
            activeStatus.innerHTML = 'No';    
        },500)
        isActive = false;
    } else {
        activeStatus.classList.remove('danger');
        activeStatus.style.opacity = 0;
        setTimeout(() => {
            activeStatus.style.opacity = 1;
            activeStatus.classList.add('success');
            activeStatus.innerHTML = 'Yes';
        },500)
        isActive = true;
    }
}

section.addEventListener('click', toggleHeight);
activeButton.addEventListener('click', toggleActive);