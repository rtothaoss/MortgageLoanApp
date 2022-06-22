import { Component, OnInit } from '@angular/core';
// import { faChartPie} from '@fortawesome/free-solid-svg-icons';
import { faFile, faCreditCard, faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  faFile = faFile;
  faPieChart = faChartBar;
  faCreditCard = faCreditCard;
  faBars = faBars;
  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  consoleLog(){
    console.log('clicked')
  }

  showContent() {
    this.isVisible = !this.isVisible;
    console.log('this is running')
  }

}
