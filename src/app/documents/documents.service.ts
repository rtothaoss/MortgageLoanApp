
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";



@Injectable({providedIn: 'root'})
export class DocumentsService {

    private BASE_URL = environment.serverUrl
   

    constructor(private http: HttpClient) {}

    getDocuments(id: string): Observable<any> {
    
        const url = `${this.BASE_URL}/api/documents/files/${id}`;
        return this.http.get(url)
    }



}