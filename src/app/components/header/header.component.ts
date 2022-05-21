import { Component, OnInit } from '@angular/core';
// import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faPieChart, faFile, faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faFile = faFile;
  faPieChart = faPieChart;
  faCreditCard = faCreditCard;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

}
