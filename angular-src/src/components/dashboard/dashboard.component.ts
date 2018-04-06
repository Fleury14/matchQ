import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit() {
    setTimeout(() => {
      console.log('animating...');
      this._animate();
    }, 500);
  }

  private _animate() {
    const navbar = document.querySelector('.nav-bar ul');
    const cards = document.getElementsByClassName('card');
    console.log('cards', cards[0].classList);


    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('owned-fade');
      cards[i].classList.remove('sub-fade');
    }
  }
}
