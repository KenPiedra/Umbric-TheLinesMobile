import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGOUT_USER,
  REGISTER_USER,
} from "../actions/authActions";

const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isRegistered: false,
};

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case AUTH_LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };

    case AUTH_LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.token,
      };

    case AUTH_LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
      };

    case AUTH_LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };

    case REGISTER_USER:
      return {
        ...state,
        isRegistered: true,
      };

    default:
      return state;
  }
}
