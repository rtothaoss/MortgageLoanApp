import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { UserService } from './services/user.service';
import { Store } from '@ngrx/store'
import * as fromApp from './store/app.reducer'
import * as AuthActions from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MortgageLoanApp';
  subscriptions: Array<Subscription> = [];

  ngOnInit(): void {
      this.store.dispatch(new AuthActions.AutoLogin())
  }

  constructor(private userService: UserService, private store: Store<fromApp.AppState>) {


  

    // this.userService.test().pipe(take(1)).subscribe(
    //   (res) => {
    //     console.log(res)
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // );

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
