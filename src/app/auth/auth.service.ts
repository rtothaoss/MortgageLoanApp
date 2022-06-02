import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { User } from '../models/user.model'

@Injectable({providedIn: 'root'})
export class AuthService {

    private BASE_URL = 'http://localhost:3000'

    constructor(private http: HttpClient) {}

    getToken(): string {
        return localStorage.getItem('token')
    }

    login(email: string, password: string): Observable<any> {
        const url = `${this.BASE_URL}/api/users/login`;
        return this.http.post<User>(url, {email, password})
    }

}