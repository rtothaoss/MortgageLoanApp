import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  isActive: boolean = false;
  arrowDown = faArrowAltCircleDown
  arrowUp = faArrowAltCircleUp

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log(this.isActive)
    this.isActive = !this.isActive
  }

}
