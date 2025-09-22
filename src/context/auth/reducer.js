import * as actionTypes from './types'

export const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  rehydrated: false
};

export function authReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, ...action.payload, isAuthenticated: true };

    case actionTypes.LOGOUT:
      return { ...initialAuthState };

    case actionTypes.RE_HYDRATE:
      return { ...state, ...action.payload, rehydrated: true }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
