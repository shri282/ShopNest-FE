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

    const getSuccessfulLoginResp = useCallback(() => {
        const successfulLoginResp = sessionStorage.getItem("successfulLoginResp");
        if (!successfulLoginResp) {
            return navigate("/login");
        }

        const loginRespObj = JSON.parse(successfulLoginResp);

        setUser(loginRespObj.user);
        setToken(loginRespObj.token);
    }, [setUser, setToken, navigate])

    useEffect(() => {
        getSuccessfulLoginResp();
    }, [getSuccessfulLoginResp]);

    return (
        <AuthContext.Provider value={{ user: user, token: token }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;