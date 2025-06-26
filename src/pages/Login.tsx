import React, { useState } from 'react';
import './css/login.css';
import { ILoginRequest } from '../interfaces/Auth';
import { Role } from '../enum/Role';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorSnackbar from '../common/ErrorSnackBar';
import LoadingOverlay from '../common/LoadingOverlay';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState<ILoginRequest>({
        username: '',
        password: '',
        role: Role.USER
    });
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);
    const [error, setError] = useState<any>(null);
    const [isApiLoading, setIsApiLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            setIsApiLoading(true);
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
            setIsApiLoading(false);
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
                <button type="submit">Login</button>
                <button onClick={() => setFormData({
                    username: "tharun", password: "tharun123", role: "user"
                })} style={{ backgroundColor: 'red' }}>Login as guest user</button>
            </form>
            <LoadingOverlay loading={isApiLoading} />
            <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
        </div>
    );
};

export default Login;
