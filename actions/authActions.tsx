import axios from 'axios';

// Define Action Types
export const AUTH_LOGIN_USER_REQUEST = 'AUTH_LOGIN_USER_REQUEST';
export const AUTH_LOGIN_USER_FAILURE = 'AUTH_LOGIN_USER_FAILURE';
export const AUTH_LOGIN_USER_SUCCESS = 'AUTH_LOGIN_USER_SUCCESS';
export const AUTH_LOGOUT_USER = 'AUTH_LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
// End of Action Types

export function authLoginUserSuccess(token: string) {
  return {
    type: AUTH_LOGIN_USER_SUCCESS,
    token,
  }
}

export function authLoginUserFailure() {
  return {
    type: AUTH_LOGIN_USER_FAILURE
  }
}

export function authLoginUserRequest() {
  return {
    type: AUTH_LOGIN_USER_REQUEST
  }
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT_USER
  }
}

export function authLogoutAndRedirect() {
  return (dispatch: any, state: any) => {
    dispatch(authLogout())
    return Promise.resolve() // TODO: we need a promise here because of the tests, find a better way
  }
}

export const authLoginUser = (username: string, password: string) => {
  return (dispatch: any) => {
    dispatch(authLoginUserRequest())
    let payload = {
      username: username,
      pass: password,
    }

    // axios({"API_LOGIN", method: 'post', data: payload, responseType: 'json'})
    axios.post("API_LOGIN", payload)
      .then((res: any) => {
      })
      .catch((err) => {
        dispatch(authLoginUserFailure())
      })
    }
}
