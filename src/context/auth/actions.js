import { writeSession } from '../../utils/WebStorage';
import * as actionTypes from './types'

const authActions = (dispatch, navigate) => {
  return {
    login: (payload) => {
      writeSession("loggedInUser", payload);
      dispatch({ type: actionTypes.LOGIN, payload });
      navigate("/");
    },
    logout: () => {
      sessionStorage.removeItem("loggedInUser");
      dispatch({ type: actionTypes.LOGOUT });
      navigate("/login");
    },
  };
};

export default authActions;
