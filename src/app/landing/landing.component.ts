import { Component, OnInit } from '@angular/core';
import { faCalculator, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  faCalculator = faCalculator;
  faQuestion = faQuestionCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
