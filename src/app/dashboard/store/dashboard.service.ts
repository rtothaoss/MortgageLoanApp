
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Mortgage } from "src/app/models/mortgage.model";



@Injectable({providedIn: 'root'})
export class DashboardService {

    private BASE_URL = 'http://localhost:3000'
   

    constructor(private http: HttpClient) {}

    getDashboard(loanNumber: string): Observable<any> {
        const url = `${this.BASE_URL}/api/mortgages/${loanNumber}`;
        return this.http.get<Mortgage[]>(url)
    }



}