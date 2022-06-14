import { Action } from '@ngrx/store';
import * as DocumentsActions from './documents.actions';

export interface State {
    documents: any
}

const initialState: State = {
    documents: []
}

export function documentsReducer(
    state = initialState,
    incomingAction: Action
) {
    const action = incomingAction as DocumentsActions.DocumentsActions

    switch(action.type) {
        case DocumentsActions.SET_DOCUMENTS:
            return {
                ...state,
                documents: [...action.payload]
            }
            default: 
            return state;
    }

}