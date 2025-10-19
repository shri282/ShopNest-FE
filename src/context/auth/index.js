import { useMemo, useReducer, createContext, useContext, useEffect } from "react";
import { initialAuthState, authReducer } from "./reducer.js";
import authActions from "./actions.js";
import authSelectors from "./selectors.js";
import { readSession } from "../../utils/WebStorage";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const auth = readSession("loggedInUser");
    if (auth) {
      dispatch({ type: "RE-HYDRATE", payload: { ...auth, isAuthenticated: true } });
    }
  }, []);

  const value = useMemo(() => [state, dispatch], [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  const [state, dispatch] = context;
  const authContextAction = authActions(dispatch);
  const authContextSelector = authSelectors(state);
  return { state, authContextAction, authContextSelector };
}

export { AuthProvider, useAuthContext };