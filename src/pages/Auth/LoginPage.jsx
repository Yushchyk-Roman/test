import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import "./AuthPages.css";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loginGoogle } = useAuth();
    const navigate = useNavigate();

const handleGoogleSignIn = async () => {
        try {
            await loginGoogle();
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Помилка входу через Google.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password); 
            navigate('/'); 
        } catch (err) {
            console.error(err.code);
            setError('Помилка входу: Неправильний email або пароль.');
        }
    };

   return (
        <div className="auth-container">
            <h2>Вхід</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    required
                />
                <button type="submit">Увійти</button>
            </form>

            <div className="divider-group">
                <div className="divider">
                    <span>АБО</span>
                </div>
                
                <button 
                    type="button" 
                    onClick={handleGoogleSignIn} 
                    className="google-btn"
                >
                    <i className="fa-brands fa-google"></i> Увійти через Google
                </button>
            </div>
            
            <p>
                Не маєте акаунту? <Link to="/register">Зареєструватися</Link>
            </p>
        </div>
    );
};

export default LoginPage;