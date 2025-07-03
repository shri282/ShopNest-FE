import React, { useState } from 'react';
import './css/login.css';
import { ILoginRequest } from '../interfaces/Auth';
import { Role } from '../enum/Role';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorSnackbar from '../common/ErrorSnackBar';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState<ILoginRequest>({
        username: '',
        password: '',
        role: Role.USER
    });
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);
    const [error, setError] = useState<any>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            setIsLoggingIn(true);
            e.preventDefault();
            const loginResp = await AuthService.login(formData);
            login(loginResp);
            if (formData.role === "user") {
                navigate("/");
            } else {
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.log(error);
            setError(error);
            setErrorPopupOpen(true);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your email"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value={Role.USER}>User</option>
                    <option value={Role.ADMIN}>Admin</option>
                    <option value={Role.SELLER}>Seller</option>
                </select>
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
                    onClick={() => setFormData({
                        username: "tharun", password: "tharun123", role: "user"
                    })}
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
            <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
        </div>
    );
};

export default Login;
