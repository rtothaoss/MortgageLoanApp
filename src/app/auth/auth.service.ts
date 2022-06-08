import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'
import { Observable } from "rxjs";

import { User } from '../models/user.model'

@Injectable({providedIn: 'root'})
export class AuthService {

    private BASE_URL = 'http://localhost:3000'

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {}

    getToken(): string {
        let userData = localStorage.getItem('userData')
        if(!userData) {
            return null;
        }
        let token = JSON.parse(userData).idToken
        
        return token
    }

    get isLoggedIn(): boolean {
        let authToken = this.getToken()
        return authToken !== null ? true : false
    }

    login(email: string, password: string): Observable<any> {
        const url = `${this.BASE_URL}/api/users/login`;
        return this.http.post<User>(url, {email, password})
    }

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout())
        }, expirationDuration)
    }

    clearLogoutTimer() {
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

}