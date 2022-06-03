import { Action } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model'


export const SET_TRANSACTIONS = '[Transactions] Set Transactions';
export const FETCH_TRANSACTIONS = '[Transactions] Fetch Transactions';

export class SetTransactions implements Action {
    readonly type = SET_TRANSACTIONS;

    constructor(public payload: Transaction[]){}
}

export class FetchTransactions implements Action {
    readonly type = FETCH_TRANSACTIONS;
    
    constructor(public payload: any){}
}


export type TransactionsActions = | SetTransactions | FetchTransactions;