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
import { Document } from '../models/document.model';



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
  
  documents;
  subscription!: Subscription;
  isVisible: boolean = false;
  selectedIndex: number;
  showDocumentDetails: boolean = false;
  webViewerInstance;
  datesArray = ['April 1, 2022', 'May 1, 2022', 'June 1, 2022']
  


  constructor(private store: Store<fromApp.AppState>, private authService: AuthService) { }

  ngOnInit(): void {

    let userData = localStorage.getItem('userData')
    let loanNumber = JSON.parse(userData).loanNumber

    this.subscription = this.store.select('documents')
    .pipe(map((documentState) => documentState.documents))
    .subscribe((documents: Document[]) => {
      
      this.documents = documents;
      const newArr = this.documents.map((x, index) => ({...x, date: this.datesArray[index]}))
      this.documents = newArr;
      
    })
    
    this.store.dispatch(
      new DocumentsActions.FetchDocuments(loanNumber)
    )

    this.documents.map(object =>  {return {...object, color: 'red'}})

  }

  consoleLog() {
    
    console.log(this.documents)
  }

  closeDocument() {
    this.showDocumentDetails = !this.showDocumentDetails
  }

  onClick() {
    console.log(this.isActive)
    this.isActive = !this.isActive
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible
  }


  selectedIndexFx(index: number) {
    this.showDocumentDetails = !this.showDocumentDetails

    let authToken = this.authService.getToken();
    let id = this.documents[index]._id
    
    let path = `http://localhost:3000/api/documents/file/${id}`

    this.webViewerInstance.UI.loadDocument(path, {
      customHeaders: {
              Authorization: "Bearer " + authToken
      }
    })

    
  }



  ngAfterViewInit(): void {
    

      WebViewer({
        path: '../../../assets/lib',
        useDownloader:false
        
      }, this.viewerRef.nativeElement).then(instance => {
    
        this.webViewerInstance = instance
          
        instance.UI.setTheme('dark')
    
      })

  }

}
