// src/hooks/useLogin.ts
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import { Role } from '../enum/Role';
import { useAsyncHandler } from './useAsyncHandler';
import { ILoginRequest } from '../interfaces/Auth';

export const useLogin = () => {
    const { authDispatch } = useAuth();
    const navigate = useNavigate();
    const asyncHandler = useAsyncHandler();

    const login = async (formData: ILoginRequest) => {
        try {
            await asyncHandler.run(async () => {
                const response = await AuthService.login(formData);
    
                authDispatch({
                    type: 'LOGIN',
                    payload: {
                        ...response,
                        isAuthenticated: true,
                    },
                });
    
                switch (formData.role) {
                    case Role.ADMIN:
                        navigate('/admin/dashboard');
                        break;
                    case Role.SELLER:
                        navigate('/seller/dashboard');
                        break;
                    default:
                        navigate('/');
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        login,
        ...asyncHandler,
    };
};