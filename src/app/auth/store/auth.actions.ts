import { Action } from '@ngrx/store';
import { User } from '../../models/user.model'

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Aut] Login Failure';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: {email: string; password: string}) {}
}

export type AuthActions = | Login