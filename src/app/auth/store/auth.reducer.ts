import { User } from '../../models/user.model';
import * as AuthActions from '../store/auth.actions';
import { Action } from '@ngrx/store';

export interface State {
  isAuthenticated: boolean;
  user: User;
  errorMessage: string;
  isLoading: boolean;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  isLoading: false,
};

export function authReducer(state = initialState, incomingAction: Action) {
  const action = incomingAction as AuthActions.AuthActions;

  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
