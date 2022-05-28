import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer'
import * as TransactionActions from '../transactions/store/transactions.actions'
import { Transaction } from '../models/transaction.model'


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  isActive: boolean = false;
  arrowDown = faArrowAltCircleDown
  arrowUp = faArrowAltCircleUp
  transactions!: Transaction[];
  subscription!: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store
    .select('transactions')
    .pipe(map(transactionState => transactionState.transactions))
    .subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });

    this.store.dispatch(new TransactionActions.FetchTransactions())
  }

  onClick() {
    console.log(this.transactions)
    this.isActive = !this.isActive
  }

}
