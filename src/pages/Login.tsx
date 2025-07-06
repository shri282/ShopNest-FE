import React from 'react';
import './css/login.css';
import { ILoginRequest } from '../interfaces/Auth';
import { Role } from '../enum/Role';
import ErrorSnackbar from '../common/ErrorSnackBar';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';

const Login: React.FC = () => {
    const {
        login,
        loading: isLoggingIn,
        error,
        isSuccess,
        setError
    } = useLogin();
    const { register, handleSubmit, setValue, reset } = useForm<ILoginRequest>({
        defaultValues: {
            username: "",
            password: "",
            role: Role.USER
        }
    });

    const onSubmit = async (loginForm: ILoginRequest) => {
        await login(loginForm);
        if (!isSuccess) {
            reset();
        }
    };

    return (
        <div className="login-container">
            <form className="login-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2>Login</h2>
                <div className='login-form-fields'>
                    <label>Username</label>
                    <input
                        {...register("username", {
                            required: "username is required"
                        })}
                        type="text"
                        name="username"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className='login-form-fields'>
                    <label>Password</label>
                    <input
                        {...register("password", {
                            required: "password is required"
                        })}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className='login-form-fields'>
                    <label>Role</label>
                    <select {...register("role")} name="role">
                        <option value={Role.USER}>User</option>
                        <option value={Role.ADMIN}>Admin</option>
                        <option value={Role.SELLER}>Seller</option>
                    </select>
                </div>
                <Button
                    fullWidth
                    type='submit'
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        marginTop: 2,
                        alignSelf: 'center',
                        '&:hover': {
                            backgroundColor: '#115293'
                        }
                    }}
                    size="medium"
                    endIcon={<LoginIcon />}
                    loading={isLoggingIn}
                    loadingPosition='end'
                    variant="contained"
                >
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                </Button>

                <Button
                    fullWidth
                    onClick={() => {
                        setValue("username", "tharun")
                        setValue("password", "tharun123")
                        setValue("role", "user")
                    }}
                    sx={{
                        backgroundColor: '#9c27b0',
                        color: 'white',
                        marginTop: 2,
                        alignSelf: 'center',
                        '&:hover': {
                            backgroundColor: '#7b1fa2'
                        }
                    }}
                    size="medium"
                    endIcon={<PersonIcon />}
                    variant="contained"
                >
                    Use Guest Credentials
                </Button>

            </form>
            <ErrorSnackbar open={Boolean(error)} message={error?.message} onClose={() => setError(null)} />
        </div>
    );
};

export default Login;
