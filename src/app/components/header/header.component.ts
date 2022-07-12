import { Component, OnDestroy, OnInit } from '@angular/core';
// import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../../auth/store/auth.actions'
import { filter, map, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

 
  faUser = faUser;
  isAuthenticated: boolean = false;
  route: string;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user
    })

    this.router.events
    .pipe(
      filter(e => e instanceof NavigationEnd)
    )
    .subscribe( (navEnd:NavigationEnd) => {
      this.route = navEnd.urlAfterRedirects;
      console.log(navEnd.urlAfterRedirects);
    });
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  consoleLog() {
   console.log(this.route)
   console.log((this.isAuthenticated && this.route !== '/calculator'))
   console.log((this.isAuthenticated && this.route !== '/'))
   console.log((this.isAuthenticated && this.route !== '/') && (this.isAuthenticated && this.route !== '/calculator'))
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }
}
