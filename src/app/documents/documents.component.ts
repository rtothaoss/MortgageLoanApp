import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { faFileArrowDown, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import WebViewer from '@pdftron/webviewer'
import * as fromApp from '../store/app.reducer'
import * as DocumentsActions from '../documents/store/documents.actions';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthInterceptor } from '../auth/auth-interceptor.service';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, AfterViewInit {
  
  @ViewChild('viewer') viewerRef: ElementRef;
  isActive: boolean = false;
  arrowDown = faArrowAltCircleDown
  arrowUp = faArrowAltCircleUp
  faFile = faFileAlt;
  faFileDown = faFileArrowDown;
  id = '62a8d08d02f9ad9dc1123e62';
  document;
  subscription!: Subscription;


  constructor(private store: Store<fromApp.AppState>, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.store.select('documents')
    .pipe(map((documentState) => documentState.documents))
    .subscribe((document: any) => {
      console.log(document)
      this.document = document;
    })
    
    this.store.dispatch(
      new DocumentsActions.FetchDocuments(this.id)
    )

  }

  onClick() {
    console.log(this.isActive)
    this.isActive = !this.isActive
  }



  consoleLog() {
    console.log(this.document)
  }

  getPDF() {
    
  }


  ngAfterViewInit(): void {
    console.log(this.document)
    const authToken = this.authService.getToken();


      WebViewer({
        path: '../../assets/lib',
      }, this.viewerRef.nativeElement).then(instance => {
        instance.UI.loadDocument('http://localhost:3000/api/upload/62a8d08d02f9ad9dc1123e62', {
          customHeaders: {
            Authorization: "Bearer " + authToken
        }
        })
      })
  }

}
