import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as TransactionActions from '../store/transactions.actions';
import * as fromApp from '../../store/app.reducer';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../transaction.service';

@Injectable()
export class TransactionEffects {
  fetchTransactions = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionActions.FETCH_TRANSACTIONS),
      map((action: TransactionActions.FetchTransactions) => action.payload),
      switchMap((payload) => {
        return this.transactionService.getTransactions(payload)
      }),
      map((transactions) => {
        return new TransactionActions.SetTransactions(transactions);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private transactionService: TransactionService
  ) {}
}
