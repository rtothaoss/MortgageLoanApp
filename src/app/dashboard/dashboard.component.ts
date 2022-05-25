import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faDollar, faDollarSign } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  arrowRight = faArrowAltCircleRight;
  faDollar = faDollarSign;

  constructor() { }

  ngOnInit(): void {
  }

}
