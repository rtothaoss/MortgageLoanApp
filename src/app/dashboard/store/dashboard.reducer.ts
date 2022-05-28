
import { Action } from '@ngrx/store';
import { Mortgage } from '../../models/mortgage.model'
import * as  DashboardActions from './dashboard.actions';

export interface State {
    dashboard: Mortgage[];
}

const initialState: State = {
    dashboard: []
}

export function dashboardReducer(
    state = initialState,
    incomingAction: Action
) {
    const action = incomingAction as DashboardActions.DashboardActions

    switch(action.type) {
        case DashboardActions.SET_DASHBOARD: 
        return {
            ...state,
            dashboard: [...action.payload]
        }
        default:
            return state;
    }
}