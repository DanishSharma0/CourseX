import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../login/login.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Signup() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.success) {
                login(data.data, data.token);
                navigate('/');
            } else {
                setError(data.message || 'Signup failed');
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
                    <h1 className="auth-card__title">Create account</h1>
                    <p className="auth-card__subtitle">Start your learning journey today</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form" id="signup-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-first">First Name</label>
                            <input
                                id="signup-first"
                                name="firstName"
                                type="text"
                                className="form-input"
                                placeholder="First name"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="signup-last">Last Name</label>
                            <input
                                id="signup-last"
                                name="lastName"
                                type="text"
                                className="form-input"
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-email">Email</label>
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="signup-password">Password</label>
                        <div className="form-input-wrapper">
                            <input
                                id="signup-password"
                                name="password"
                                type={showPass ? 'text' : 'password'}
                                className="form-input"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                                minLength={6}
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
                        id="signup-submit-btn"
                    >
                        {loading ? (
                            <span className="auth-spinner"></span>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login" className="auth-switch__link">Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;