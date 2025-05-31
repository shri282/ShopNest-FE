import React, { useCallback, useEffect, useState } from 'react'
import AuthContext from '../AuthContext'
import { User } from '../../interfaces/User';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
    children: any
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<String | null>(null);
    const navigate = useNavigate();

    const loadUserFromSession = useCallback(() => {
        const loggedInUserStr = sessionStorage.getItem("loggedInUser");

        if (!loggedInUserStr) {
            navigate("/login");
            return;
        }

        try {
            const { user, token } = JSON.parse(loggedInUserStr);

            if (!user || !token) {
                navigate("/login");
                return;
            }

            setUser(user);
            setToken(token);
        } catch (error) {
            console.error("Invalid login data:", error);
            navigate("/login");
        }
    }, [setUser, setToken, navigate]);
    

    useEffect(() => {
        loadUserFromSession();
    }, [loadUserFromSession]);

    return (
        <AuthContext.Provider value={{ user: user, token: token }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;