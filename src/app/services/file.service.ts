import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http, Headers, ResponseContentType } from '@angular'

@Injectable()
export class FilesService {

  constructor(private http: HttpClient) { }

    downloadPDF(filename, filetype): any {
    // return this.http.get('http://127.0.0.1:3000/file/' + filename,
    // { responseType: ResponseContentType.Blob });
  }

  showFileNames() {
    // return this.http.get('http://127.0.0.1:3000/files');
  }
}