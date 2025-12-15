import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './AuthPages.css'; 

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register, loginGoogle } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        if (!email || !password) {
            return setError('Будь ласка, заповніть усі поля.');
        }

        try {
            await register(email, password); 
            navigate('/'); 
        } catch (err) {
            console.error(err.code);
            let errorMessage = 'Помилка реєстрації. Спробуйте ще раз.';
            if (err.code === 'auth/email-already-in-use') {
                 errorMessage = 'Цей email вже зареєстровано.';
            } else if (err.code === 'auth/weak-password') {
                 errorMessage = 'Пароль має бути не менше 6 символів.';
            }
            setError(errorMessage);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            await loginGoogle(); 
            navigate('/'); 
        } catch (err) {
            console.error("Помилка Google Auth:", err);
            setError('Не вдалося увійти/зареєструватися через Google. Спробуйте ще раз.');
        }
    };
    
    return (
        <div className="auth-container">
            <h2>Реєстрація</h2>
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
                    placeholder="Пароль (мінімум 6 символів)"
                    required
                />
                <button type="submit">Зареєструватися</button>
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
                    <i className="fa-brands fa-google"></i> Зареєструватися через Google
                </button>
            </div>
            
            <p>
                Вже маєте акаунт? <Link to="/login">Увійти</Link>
            </p>
        </div>
    );
};

export default RegisterPage;