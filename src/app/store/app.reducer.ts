import { ActionReducerMap } from '@ngrx/store'
import * as fromTransactions from '../transactions/store/transactions.reducer'

export interface AppState {
    transactions: fromTransactions.State
}

export const appReducer: ActionReducerMap<AppState> = {
    transactions: fromTransactions.transactionReducer
}