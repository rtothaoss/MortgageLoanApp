import { ActionReducerMap } from '@ngrx/store'
import * as fromTransactions from '../transactions/store/transactions.reducer'
import * as fromDashboard from '../dashboard/store/dashboard.reducer'
import * as fromAuth from '../auth/store/auth.reducer'
import * as fromDocuments from '../documents/store/documents.reducer';

export interface AppState {
    transactions: fromTransactions.State,
    dashboard: fromDashboard.State,
    auth: fromAuth.State,
    documents: fromDocuments.State
}

export const appReducer: ActionReducerMap<AppState> = {
    transactions: fromTransactions.transactionReducer,
    dashboard: fromDashboard.dashboardReducer,
    auth: fromAuth.authReducer,
    documents: fromDocuments.documentsReducer
}