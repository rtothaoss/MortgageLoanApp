import { Component, OnDestroy, OnInit } from '@angular/core';
// import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../../auth/store/auth.actions'
import { map, Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

 
  faUser = faUser;
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  consoleLog() {
    console.log('this is working')
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
