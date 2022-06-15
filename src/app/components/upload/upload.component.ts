import { Component, Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';


import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons'
import { UploadService } from './upload.service';
import { AuthService } from 'src/app/auth/auth.service';

const URL = 'http://localhost:3000/api/upload';

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
 
  constructor (private authService: AuthService){
    // this.uploader = new FileUploader({
    //   url: URL,
    //   disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    //   formatDataFunctionIsAsync: true,
    //   formatDataFunction: async (item) => {
    //     console.log('this runs')
    //     console.log(item)
    //     return new Promise( (resolve, reject) => {
    //       resolve({
    //         originalname: item._file.name,
    //         mimetype: item._file.mimetype,
    //         id: item._file.id,
    //         size: item._file.size
           
    //       });
    //     });
    //   }
    // });

  
   

    let userData = localStorage.getItem('userData')
    // let token = JSON.parse(userData).idToken
    // let newToken = `Bearer ${token}`

    let token = this.authService.getToken()
    let newToken = `Bearer ${token}`

    let loanNumber = JSON.parse(userData).loanNumber

    this.uploader = new FileUploader({url: URL, authToken: newToken, headers: [{name:  "loanNumber", value: loanNumber}]});
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );
  }

  ngOnInit(): void {
      
  }
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  consoleLog() {
    console.log('this works')
  }


}
