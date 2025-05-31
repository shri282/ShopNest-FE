import React, {
    useCallback,
    useEffect,
    useState,
    createContext,
    useContext,
} from 'react';
import { User } from '../interfaces/User';
import { ISuccessfulLoginResponse } from '../interfaces/Auth';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (loginResp: ISuccessfulLoginResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useCallback(({ user, token }: ISuccessfulLoginResponse) => {
        sessionStorage.setItem('loggedInUser', JSON.stringify({ user, token }));
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        sessionStorage.clear();
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        navigate("/login")
    }, [navigate]);

    const loadUserFromSession = useCallback(() => {
        const stored = sessionStorage.getItem('loggedInUser');

        if (!stored) return;

        try {
            const parsed = JSON.parse(stored);
            if (parsed?.user && parsed?.token) {
                setUser(parsed.user);
                setToken(parsed.token);
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.error('Invalid session data:', err);
        }
    }, []);

    useEffect(() => {
        loadUserFromSession();
    }, [loadUserFromSession]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
