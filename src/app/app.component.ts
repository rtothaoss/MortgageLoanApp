import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'MortgageLoanApp';
  subscriptions: Array<Subscription> = [];

  constructor(private userService: UserService) {
    this.userService.test().pipe(take(1)).subscribe(
      (res) => {
        console.log(res)
      },
      (error) => {
        console.log(error)
      }
    );

    // this.subscriptions.push(this.userService.test().subscribe(
    //   res => {
    //     console.log(res)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // ))

  }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach((subscription) => {
  //     subscription.unsubscribe();
  //   })
  // }

}
