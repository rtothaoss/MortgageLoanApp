import { Component, OnInit } from '@angular/core';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as TransactionActions from '../transactions/store/transactions.actions';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  totalAmountReceived: string;
  isActive: boolean = false;
  arrowDown = faArrowAltCircleDown;
  arrowUp = faArrowAltCircleUp;
  transactions!: Transaction[];
  subscription!: Subscription;
  loanNumber: string;
  showPaymentDetails: boolean = false;
  display: boolean = false;
  selectedIndex: number;
  close: boolean = false;
  amountPaidYTD: string;
  principalPaidYTD: string;
  interestPaidYTD: string;
  pmiPaidYTD: string;
  feesPaidYTD: string;
  escrowPaidYTD: string;


  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    let userData = localStorage.getItem('userData');
    this.loanNumber = JSON.parse(userData).loanNumber;

    this.subscription = this.store
      .select('transactions')
      .pipe(map((transactionState) => transactionState.transactions))
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions.slice().reverse();
        this.YTD('totalAmountReceived', 'amountPaidYTD');
        this.YTD('principal', 'principalPaidYTD');
        this.YTD('interest', 'interestPaidYTD');
        this.YTD('pmi', 'pmiPaidYTD');
        this.YTD('fees', 'feesPaidYTD');
        this.YTD('escrow', 'escrowPaidYTD');
      });

    this.store.dispatch(
      new TransactionActions.FetchTransactions(this.loanNumber)
    );
    
  }

  onClick() {
    console.log(this.transactions);
    this.isActive = !this.isActive;
  }

  selectedIndexFx(index: number) {
    if(this.showPaymentDetails && index !== this.selectedIndex) {
      this.selectedIndex = index;
    } else {
      this.selectedIndex = index;
      this.showPaymentDetails = !this.showPaymentDetails;
    }
  }

  
  YTD(arrValue, ytdValue ) {
    let x = this.transactions.map(a => +a[arrValue].replace(/[^0-9.]/g, ''));
    let y = this.total(x)
    this[ytdValue] = y.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }


  total(values: Array<number>) {
    const sum = values.reduce((a,b) => {return a + b}, 0)
    return sum;
  }

}
