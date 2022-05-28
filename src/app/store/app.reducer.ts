import { ActionReducerMap } from '@ngrx/store'
import * as fromTransactions from '../transactions/store/transactions.reducer'
import * as fromDashboard from '../dashboard/store/dashboard.reducer'

export interface AppState {
    transactions: fromTransactions.State,
    dashboard: fromDashboard.State
}

export const appReducer: ActionReducerMap<AppState> = {
    transactions: fromTransactions.transactionReducer,
    dashboard: fromDashboard.dashboardReducer
}