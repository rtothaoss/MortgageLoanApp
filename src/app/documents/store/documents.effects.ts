import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { DocumentsService } from '../documents.service';
import * as DocumentsActions from './documents.actions';

@Injectable()
export class DocumentsEffects {
  fetchDcouments = createEffect(() => {
    return this.actions$.pipe(
      ofType(DocumentsActions.FETCH_DOCUMENTS),
      map((action: DocumentsActions.FetchDocuments) => action.payload),
      switchMap((payload) => {
        console.log(payload);
        return this.documentsService.getDocuments(payload);
      }),
      map((documents) => {
        console.log(documents);
        return new DocumentsActions.SetDocuments(documents);
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private documentsService: DocumentsService
  ) {}
}
