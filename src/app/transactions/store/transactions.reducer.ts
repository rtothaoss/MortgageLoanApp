import { Transaction  } from '../../models/transaction.model'
import * as TransactionsActions from './transactions.actions'

export interface State {
   transactions: Transaction[]; 
}

const intitialState: State = {
    transactions: []
}

export function transactionReducer(
    state = intitialState,
    action: TransactionsActions.TransactionsActions
) {
    switch(action.type) {
        case TransactionsActions.SET_TRANSACTIONS:
            return {
                ...state,
                transactions: [...action.payload]
            }
        default:
            return state;
    }
}