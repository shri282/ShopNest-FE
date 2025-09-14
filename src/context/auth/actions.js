import { writeSession } from '../../utils/WebStorage';
import * as actionTypes from './types'

const authActions = (dispatch) => {
  return {
    login: (payload) => {
      writeSession("loggedInUser", payload);
      dispatch({ type: actionTypes.LOGIN, payload });
    },
    logout: () => {
      sessionStorage.removeItem("loggedInUser");
      dispatch({ type: actionTypes.LOGOUT });
    },
  };
};

export default authActions;
