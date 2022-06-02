import * as AuthActions from '../store/auth.actions';
import { Action } from '@ngrx/store';
import { AuthResponse } from '../../models/authResponse.model'


export interface State {
  isAuthenticated: boolean;
  user: AuthResponse;
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
      case AuthActions.LOGOUT:
        return {
          ...state,
          user: null
        };
        case AuthActions.LOGIN_SUCCESS:
          const user = new AuthResponse(
            action.payload.idToken,
            action.payload.expirationDate,
            action.payload.loanNumber
          )
          return {
            ...state,
            isAuthenticated: true,
            user: user,
            errorMessage: null,
            isLoading: false
          };
        case AuthActions.LOGIN_FAILURE:
          return {
            ...state,
            user: null,
            errorMessage: action.payload,
            loading: false
          };
    default:
      return state;
  }
}