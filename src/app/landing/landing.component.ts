import { Component, OnInit } from '@angular/core';
import { faCalculator, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  faCalculator = faCalculator;
  faQuestion = faQuestionCircle;

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.route.navigate(['/calculator'])
  }


}
