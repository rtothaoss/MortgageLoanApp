
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment  } from "src/environments/environment";

import { Observable } from "rxjs";



@Injectable({providedIn: 'root'})
export class UploadService {

    private BASE_URL = environment.serverUrl
   

    constructor(private http: HttpClient) {}

    showFileNames(id: string): Observable<any> {
      
        const url = `${this.BASE_URL}/api/documents`;
        return this.http.get(url)
    }



}