/*jshint esversion: 6 */

const h3 = document.getElementById('sectionh3');
const section = document.querySelector('section');
const activeButton = document.getElementById('activeToggle');
const activeStatus = document.getElementById('activeStatus');
let isActive = true;
const sortable = document.getElementById('sortable');

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

function drag(event) {
    console.log(event);
    event.dataTransfer.getData('text', event.target.id);
}

function drop(event) {
    console.log(event);
}

function updateText() {
    for (i = 1; i < 5; i++) {
        if (i === 1) {
            document.querySelector(`#sortable li:nth-child(${i}) .status-text`).innerHTML = "<strong>On Stream</strong>";
        } else if (i === 2) {
            document.querySelector(`#sortable li:nth-child(${i}) .status-text`).innerHTML = "On Deck";
        } else {
            document.querySelector(`#sortable li:nth-child(${i}) .status-text`).innerHTML = `#${i}`;
        }
    }
}

$( function() {
    $( "#sortable" ).sortable({
        update: function( event, ui ) {
            // console.log('event', event, ui);
            // console.log(sortable);
            console.log(document.querySelector('#sortable li:nth-child(1) .status-text'));
            updateText();
        }
      });
    $( "#sortable" ).disableSelection();
  } );

section.addEventListener('click', toggleHeight);
activeButton.addEventListener('click', toggleActive);