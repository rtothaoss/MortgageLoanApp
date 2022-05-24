import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  isActive: boolean = false;
  arrowDown = faArrowAltCircleDown
  arrowUp = faArrowAltCircleUp

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log(this.isActive)
    this.isActive = !this.isActive
  }

}
