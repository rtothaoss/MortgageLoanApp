import { Action } from '@ngrx/store';
import { User } from '../../models/user.model'

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: {email: string; password: string}) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: any){}
}

export class LogInFailure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: any) {}
  }

export class Logout implements Action {
    readonly type  = LOGOUT;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
  }



export type AuthActions = | Login | LoginSuccess | LogInFailure | Logout | AutoLogin