import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as authActions from '../store/auth.actions';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthResponse } from '../../models/authResponse.model'



const handleAuthentication = (
  token: string,
  expirationTime: number,
  loanNumber: string
) => {
  const expirationDate = new Date(new Date().getTime() + expirationTime * 1000);
  const user = new AuthResponse(token, expirationDate, loanNumber)
  localStorage.setItem('userData', JSON.stringify(user));
  return new authActions.LoginSuccess({
      token: token,
      expirationDate: expirationDate,
      loanNumber: loanNumber
  })
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new authActions.LogInFailure(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new authActions.LogInFailure(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.LOGIN),
      map((action: authActions.Login) => action.payload),
      switchMap((payload) => {
        return this.authService.login(payload.email, payload.password);
      }),
      map((user) => {
        console.log(user);
        return handleAuthentication(
          user.idToken,
          user.expiresIn,
          user.loanNumber,
        );
      }),
      catchError((errorRes) => {
        console.log(errorRes);
        return handleError(errorRes);
      })
    );
  });
}
