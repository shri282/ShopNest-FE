import React, {
    useEffect,
    useContext,
    useReducer,
} from 'react';
import { User } from '../interfaces/User';
import { readSession, writeSession } from '../utils/WebStorage';
import { createContext } from 'react';

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthState {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false
}

interface AuthContextType extends AuthState {
    authDispatch: React.Dispatch<{ type: string; payload: AuthState }>;
}

const AuthContext = createContext<AuthContextType>({
    ...initialAuthState,
    authDispatch: () => {}
});

const authReducer = (state: AuthState, action: { type: string, payload: AuthState }) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
            };

        default:
            return state;
    }
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        const storedAuth: AuthState = readSession('loggedInUser');

        if (storedAuth && !authState.isAuthenticated) {
            dispatch({ type: "LOGIN", payload: storedAuth})
        } else if (authState.isAuthenticated) {
            writeSession("loggedInUser", authState)
        }

    }, [authState])

    return (
        <AuthContext.Provider value={{ isAuthenticated: authState.isAuthenticated, user: authState.user, token: authState.token, authDispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
