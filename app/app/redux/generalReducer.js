//Action Types
export const LOGIN = 'GENERAL_LOGIN';
export const LOGIN_SUCCESS = 'GENERAL_LOGIN_SUCCESS';
export const LOGIN_FAIL = 'GENERAL_LOGIN_FAIL';
export const LOGOUT = 'GENERAL_LOGOUT';

//Actions
export function loginAction(email, password) {
  return async dispatch => {
    dispatch({
      type: LOGIN,
      payload: {
        email,
        password,
      },
    });
  };
}

export function loginSuccessAction(authToken, userData) {
  return async dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        authToken,
        userData,
      },
    });
  };
}

export function loginFailAction(error) {
  return async dispatch => {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        error,
      },
    });
  };
}

export function logoutAction(error) {
  return async dispatch => {
    dispatch({
      type: LOGOUT,
    });
  };
}

//Reducer
const initialState = {
  authToken: null,
  user: {},
};

export const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authToken: action.payload.authToken,
        user: action.payload.userData,
      };
    case LOGOUT:
      return {
        ...state,
        authToken: null,
        user: initialState.user,
      };
    default:
      return state;
  }
};
