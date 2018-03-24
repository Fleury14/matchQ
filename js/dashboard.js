const navbar = document.querySelector('.nav-bar ul');
const cards = document.getElementsByClassName('card');

window.onload = function() { 
    navbar.classList.remove('faded'); 
    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('owned-fade');
            cards[i].classList.remove('sub-fade');    
    }
    // cards.forEach( card => {
    //     card.classList.remove('owned-fade');
    //     card.classList.remove('sub-fade');
    // } );
    
    
};