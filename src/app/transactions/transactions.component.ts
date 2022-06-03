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
  principal: string;
  interest: string;
  pmi: string;
  escrow: string;
  fees: string;
  totalAmountReceived: string;
  isActive: boolean = false;
  arrowDown = faArrowAltCircleDown;
  arrowUp = faArrowAltCircleUp;
  transactions!: Transaction[];
  subscription!: Subscription;
  loanNumber: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    let userData = localStorage.getItem('userData');
    this.loanNumber = JSON.parse(userData).loanNumber;

    this.subscription = this.store
      .select('transactions')
      .pipe(map((transactionState) => transactionState.transactions))
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
        this.principal = transactions[0].principal;
        this.interest = transactions[0].interest;
        this.pmi = transactions[0].pmi;
        this.escrow = transactions[0].escrow;
        this.fees = transactions[0].fees;
        this.totalAmountReceived = transactions[0].totalAmountReceived;
      });

    this.store.dispatch(
      new TransactionActions.FetchTransactions(this.loanNumber)
    );
  }

  onClick() {
    console.log(this.transactions);
    this.isActive = !this.isActive;
  }
}
