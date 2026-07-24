import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                login(data.data, data.token);
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Unable to connect to server');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page page-enter">
            <div className="auth-page__bg-grid"></div>
            <div className="auth-card">
                <div className="auth-card__header">
                    <h1 className="auth-card__title">Welcome back</h1>
                    <p className="auth-card__subtitle">Sign in to continue your learning journey</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form" id="login-form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            className="form-input"
                            placeholder="hunter@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="login-password">Password</label>
                        <div className="form-input-wrapper">
                            <input
                                id="login-password"
                                type={showPass ? 'text' : 'password'}
                                className="form-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="form-toggle-pass"
                                onClick={() => setShowPass(!showPass)}
                                tabIndex={-1}
                            >
                                {showPass ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                        id="login-submit-btn"
                    >
                        {loading ? (
                            <span className="auth-spinner"></span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/signup" className="auth-switch__link">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;