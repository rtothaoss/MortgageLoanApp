import { Component, OnInit } from '@angular/core';
// import { faChartPie} from '@fortawesome/free-solid-svg-icons';
import { faFile, faCreditCard, faChartBar } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  faFile = faFile;
  faPieChart = faChartBar;
  faCreditCard = faCreditCard;

  constructor() { }

  ngOnInit(): void {
  }

}
