import * as actionTypes from './types'

const authActions = (dispatch) => {
  return {
    login: (payload) => {
      dispatch({ type: actionTypes.LOGIN, payload });
    },
    logout: () => {
      dispatch({ type: actionTypes.LOGOUT });
    },
  };
};

export default authActions;
