import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await loginAdmin({ email, password });
            
            // Login details-ah local storage-la store pannuvom
            localStorage.setItem('token', res.data.session.access_token);
            localStorage.setItem('isAuthenticated', 'true');
            
            navigate('/'); // Dashboard-ku redirect pannum
        } catch (err) {
            alert("Login Failed: " + (err.response?.data?.error || "Invalid Credentials"));
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-header">
                    <h2>Admin Login</h2>
                    <p>School Management System</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" required placeholder="admin@school.com" 
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" required placeholder="••••••••" 
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="login-btn">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;