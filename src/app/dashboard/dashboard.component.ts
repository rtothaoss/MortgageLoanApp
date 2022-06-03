import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faDollar, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { UIChart } from 'primeng/chart';
import { map, Subscription } from 'rxjs';
import { Mortgage } from '../models/mortgage.model';
import * as fromApp from '../store/app.reducer'
import * as DashboardActions from '../dashboard/store/dashboard.actions'
import { DashboardService } from './store/dashboard.service';
import { AuthResponse } from '../models/authResponse.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart!: UIChart;

  public userAppData: any;

  monthlyPrinciple: number = 777;
  monthlyInterest: number = 488;
  remainingLoanBalance: string;
  totalMonthlyPayment: string;
  loanNumber: AuthResponse;

  public options: any;

  arrowRight = faArrowAltCircleRight;
  faDollar = faDollarSign;

  mortgage: Mortgage[]
  subscription: Subscription;

  


  constructor(private store: Store<fromApp.AppState>, private dashboardService: DashboardService) {

    let dataValues = [
      this.monthlyPrinciple.toFixed(0),
      this.monthlyInterest.toFixed(0),
    ];
    let chartLabels: Array<string> = ['Principal', 'Interest'];

    this.userAppData = {
      labels: chartLabels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            '#643A71',
            '#8B5FBF',
            '#D183C9',
            '#E3879E',
            '#FEC0CE',
          ],
        },
      ],
    };
    this.options = {
      //display labels on data elements in graph
      plugins: {
        datalabels: {
          align: 'center',
          anchor: 'center',
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0)',
          color: 'white',
          font: {
            weight: 'bold',
            size: 12
          },
          formatter: function (value: any, context: any) {
            return '$' + value;
          },
        },
        // display chart title
     
        legend: {
          position: 'bottom',
          labels : {
            boxWidth: 20,
            color: 'black',
            font: {
              size: 14,
            }
          }
        },
      },
    };
   }

  ngOnInit(): void {

    let userData = localStorage.getItem('userData');
    this.loanNumber = JSON.parse(userData).loanNumber;

    this.subscription = this.store
    .select('dashboard')
    .pipe(map(dashboardState => dashboardState.dashboard))
    .subscribe((dashboard: Mortgage[]) => {
      this.mortgage = dashboard
      this.remainingLoanBalance = dashboard[0].remainingLoanBalance
      this.totalMonthlyPayment = dashboard[0].totalMonthlyPayment
    })

    this.store.dispatch(new DashboardActions.FetchMortgage(this.loanNumber))
    
  }


  logger() {
    console.log(this.mortgage)
    console.log(this.totalMonthlyPayment)
    console.log(this.remainingLoanBalance)
  }

}
