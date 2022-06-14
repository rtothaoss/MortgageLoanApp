import { Action } from '@ngrx/store';

export const SET_DOCUMENTS = '[Documents] Set Documents';
export const FETCH_DOCUMENTS = '[Documents] Fetch Documents';

export class SetDocuments implements Action {
    readonly type = SET_DOCUMENTS;

    constructor(public payload: any) {}
}

export class FetchDocuments implements Action {
    readonly type = FETCH_DOCUMENTS;

    constructor(public payload: any){}

}

export type DocumentsActions = | SetDocuments | FetchDocuments;