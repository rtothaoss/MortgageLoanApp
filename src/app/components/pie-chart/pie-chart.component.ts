import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { UIChart } from 'primeng/chart';
import { Subscription, withLatestFrom } from 'rxjs';
import { CalculatorService } from '../mortgage-calculator/mortgage-calculator.service';


Chart.register(ChartDataLabels);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: UIChart;

  private includeTaxesAndInsuranceChange!: Subscription

  private mortgageInfoChangeSub!: Subscription;


  monthlyPayments = '';
  monthlyPrinciple!: number;
  monthlyInterest!: number;
  hoa!: number;
  taxes!: number;
  homeInsurance!: number;
  showTaxesAndInsurance!: boolean;
  

  public userAppData: any;

  public options: any;
  public userUsageHoursData: any;

  ngOnInit(): void {

    this.monthlyPrinciple = this.calcService.getMonthlyPrinciple();

    this.monthlyInterest = this.calcService.getMonthlyInterest();

    this.monthlyInterest = this.calcService.getMonthlyInterest();

    this.mortgageInfoChangeSub = this.calcService.mortgageInfoChange.subscribe((value) => {

      this.monthlyPrinciple = +value.monthlyPrinciple,
      this.monthlyInterest = +value.monthlyInterest,
      this.taxes = value.propertyTax
      this.homeInsurance = value.homeInsurance
      this.hoa = value.hoaDues
      if (this.monthlyPayments != value.monthlyPayment) {
              this.monthlyPayments = value.monthlyPayment;
              this.constructChart();
            }
    })


      this.includeTaxesAndInsuranceChange =
      this.calcService.includeTaxesAndInsuranceChange.subscribe((value) => {

        this.showTaxesAndInsurance = value;
       
      });

 

    this.constructChart();
  }

  constructor(private calcService: CalculatorService) {}

  constructChart() {
    let dataValues = [
      this.monthlyPrinciple.toFixed(0),
      this.monthlyInterest.toFixed(0),
    ];
    let chartLabels: Array<string> = ['Principal', 'Interest'];

    if (this.hoa > 0) {
      dataValues.push(this.hoa.toFixed(0));
      chartLabels.push('HOA');
    }
    
    if (this.taxes > 0 && this.showTaxesAndInsurance) {
      let taxes = (this.taxes / 12).toFixed(0)
      dataValues.push(taxes);
      chartLabels.push('Taxes');
    }

    
    if (this.homeInsurance > 0 && this.showTaxesAndInsurance) {
      dataValues.push(this.homeInsurance.toFixed(0));
      chartLabels.push('Insurance');
    }

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
            size: 16
          },
          formatter: function (value: any, context: any) {
            return '$' + value;
          },
        },
        // display chart title
     
        legend: {
          position: 'left',
          labels : {
            boxWidth: 40,
            padding: 30,
            color: 'black',
            font: {
              size: 14,
            }
          }
        },
      },
    };
  }

  onUpdate() {
 
  }

  ngOnDestroy(): void {
    this.mortgageInfoChangeSub.unsubscribe();
    this.includeTaxesAndInsuranceChange.unsubscribe();
  }
}
