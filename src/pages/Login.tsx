import React, { useState } from 'react';
import './css/login.css';
import { ILoginRequest } from '../interfaces/Auth';
import { Role } from '../enum/Role';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorSnackbar from '../common/ErrorSnackBar';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState<ILoginRequest>({
        username: '',
        password: '',
        role: Role.USER
    });
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const loginResp = await AuthService.login(formData);
            login(loginResp);
            if (formData.role == 0) {
                navigate("/");
            } else {
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.log(error);
            setError(error);
            setErrorPopupOpen(true);
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
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                </select>
                <button type="submit">Login</button>
            </form>
            <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
        </div>
    );
};

export default Login;
