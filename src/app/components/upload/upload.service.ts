
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";



@Injectable({providedIn: 'root'})
export class UploadService {

    private BASE_URL = 'http://localhost:3000'
   

    constructor(private http: HttpClient) {}

    showFileNames(id: string): Observable<any> {
        console.log('this runs')
        const url = `${this.BASE_URL}/api/upload`;
        return this.http.get(url)
    }



}