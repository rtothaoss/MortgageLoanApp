import { Component, OnInit } from '@angular/core';
import { faCalculator, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  faCalculator = faCalculator;
  faQuestion = faQuestionCircle;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    this.route.navigate(['/calculator'])
  }

}
