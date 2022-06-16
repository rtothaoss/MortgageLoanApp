import { Component, Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';


import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { UploadService } from './upload.service';
import { AuthService } from 'src/app/auth/auth.service';

const URL = 'http://localhost:3000/api/documents';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})


export class UploadComponent implements OnInit {

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  faDownload = faDownload
 
  constructor (private authService: AuthService){
   

    let userData = localStorage.getItem('userData')

    let token = this.authService.getToken()
    let newToken = `Bearer ${token}`

    let loanNumber = JSON.parse(userData).loanNumber

    this.uploader = new FileUploader({url: URL, authToken: newToken, headers: [{name:  "loanNumber", value: loanNumber}]});
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.uploader.response.subscribe( res => this.response = res );
  }

  ngOnInit(): void {
      
  }

  onFileSelected () {
    this.uploader.uploadAll();
  }


 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }


}
