import { Component, OnInit } from '@angular/core';
// import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../../auth/store/auth.actions'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  faUser = faUser;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }


}
