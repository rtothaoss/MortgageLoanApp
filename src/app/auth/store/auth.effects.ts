import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as authActions from '../store/auth.actions';
import { catchError, map, Observable, of, pipe, switchMap, tap } from 'rxjs';
import { AuthResponse } from '../../models/authResponse.model'
import { User } from 'src/app/models/user.model';



const handleAuthentication = (
  token: string,
  expirationTime: number,
  loanNumber: string
) => {
  const expirationDate = new Date(new Date().getTime() + expirationTime * 1000);
  console.log(expirationDate)
  const user = new AuthResponse(token, expirationDate, loanNumber)
  localStorage.setItem('userData', JSON.stringify(user));
  return new authActions.LoginSuccess({
      token: token,
      expirationDate: expirationDate,
      loanNumber: loanNumber,
      redirect: true
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
      pipe(
        tap(resData => {
          console.log(resData.expiresIn)
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          // this.authService.setLogoutTimer(10 * 1000);
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
    )
    );
  });

  autoLogin = createEffect(() => {

  this.authService.verifyTokenExpiration()

  return this.actions$.pipe(
      ofType(authActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          expirationDate: Date,
          idToken: string,
          loanNumber: string
        } = JSON.parse(localStorage.getItem('userData'));

        
        if(!userData) {
          return {type: 'Dummy'}
        }

        const loadedUser = new AuthResponse(
          userData.idToken,
          userData.expirationDate,
          userData.loanNumber
        );


        if(loadedUser.idToken){
          
          const expirationDuration =
          new Date(userData.expirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new authActions.LoginSuccess({
          idToken: loadedUser.idToken,
          expirationDate: loadedUser.expirationDate,
          loanNumber: loadedUser.loanNumber,
          redirect: false

        })

        }
        return { type: 'Dummy'}
      })
    )
  })

  logout = createEffect(() => 
      () => this.actions$.pipe(
          ofType(authActions.LOGOUT),
          tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/']);
          })
          
      ),
      {dispatch: false}
      
  )


  redirect = createEffect(() => 
  () => this.actions$.pipe(
      ofType(authActions.LOGIN_SUCCESS),
      tap((authSuccessAction: authActions.LoginSuccess) => {
        if(authSuccessAction.payload.redirect) {
          this.router.navigate(['/dashboard']);
        }
      })  
  ),
  {dispatch: false}
  
)


}
