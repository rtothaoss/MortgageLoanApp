import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as DashboardActions from '../store/dashboard.actions'
import { Mortgage } from '../../models/mortgage.model';
import { map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardEffects {

    fetchDashboard = createEffect(() => {
        return this.actions$.pipe(
            ofType(DashboardActions.FETCH_DASHBOARD),
            map((action: DashboardActions.FetchMortgage) => action.payload),
            switchMap((payload) => {
                
                return this.dashboardService.getDashboard(payload)
            }),
            map((dashboard) => {
                
                return new DashboardActions.SetMortgage(dashboard)
            })
        )
    })



  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private dashboardService: DashboardService
  ) {}
}
