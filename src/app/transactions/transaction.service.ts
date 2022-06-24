
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Transaction } from '../models/transaction.model'


@Injectable({providedIn: 'root'})
export class TransactionService {

    private BASE_URL = environment.serverUrl
   

    constructor(private http: HttpClient) {}

    getTransactions(loanNumber: string): Observable<any> {
        const url = `${this.BASE_URL}/api/transactions/${loanNumber}`;
        return this.http.get<Transaction[]>(url)
    }



}