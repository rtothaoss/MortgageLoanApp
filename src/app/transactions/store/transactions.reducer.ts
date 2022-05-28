import { Action } from '@ngrx/store';
import { Transaction  } from '../../models/transaction.model'
import * as TransactionsActions from './transactions.actions'

export interface State {
    transactions: Transaction[];
  }
  
  const initialState: State = {
    transactions: [{
        "loanNumber": "",
        "dateReceived": "",
        "totalAmountReceived": "",
        "principal": "",
        "interest": "",
        "pmi": "",
        "escrow": "",
        "fees": ""
  }]
  };

export function transactionReducer(
    state = initialState,
    incomingAction: Action
) {
    const action = incomingAction as TransactionsActions.TransactionsActions

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

