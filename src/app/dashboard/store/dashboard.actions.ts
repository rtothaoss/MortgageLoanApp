import { Action } from "@ngrx/store"
import { Mortgage } from '../../models/mortgage.model'

export const SET_DASHBOARD = '[Dashboard] Set Dashboard'
export const FETCH_DASHBOARD = '[Dashboard] Fetch Dashboard'

export class SetMortgage implements Action {
    readonly type = SET_DASHBOARD;

    constructor(public payload: Mortgage[]) {}
}

export class FetchMortgage implements Action {
    readonly type = FETCH_DASHBOARD;
    
    constructor(public payload: any) {}
}

export type DashboardActions = | SetMortgage | FetchMortgage;