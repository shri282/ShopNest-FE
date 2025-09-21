// src/hooks/useLogin.ts
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { Role } from '../enum/Role';
import { useAsyncHandler } from './useAsyncHandler';
import { ILoginRequest } from '../interfaces/Auth';
import { useAuthContext } from '../context/auth';
import { useNotification } from '../context/notification';

export const useLogin = () => {
    const { authContextAction } = useAuthContext();
    const navigate = useNavigate();
    const asyncHandler = useAsyncHandler();
    const { showMessage } = useNotification();

    const login = async (formData: ILoginRequest) => {
        try {
            await asyncHandler.run(async () => {
                const user = await AuthService.login(formData);
    
                authContextAction.login(user);
    
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
        } catch (error: any) {
            showMessage(error.message, "Error");
        }
    };

    return {
        login,
        ...asyncHandler,
    };
};