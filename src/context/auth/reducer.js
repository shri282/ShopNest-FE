import * as actionTypes from './types'

export const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, ...action.payload, isAuthenticated: true };

    case actionTypes.LOGOUT:
      return { ...initialAuthState };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
