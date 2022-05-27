import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faDollar, faDollarSign } from '@fortawesome/free-solid-svg-icons'

import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

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

  public options: any;

  arrowRight = faArrowAltCircleRight;
  faDollar = faDollarSign;

  constructor() {

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
  }

}
