import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './navbar.css';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
            <div className="navbar__inner">
                {/* Logo */}
                <Link to="/" className="navbar__logo" id="nav-logo">
                    <span className="navbar__logo-icon">⚡</span>
                    <span className="navbar__logo-text">Course<span className="navbar__logo-accent">X</span></span>
                </Link>

                {/* Desktop Nav Links */}
                <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
                    <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`} id="nav-home">
                        Home
                    </Link>

                    <Link to="/courses" className={`navbar__link ${isActive('/courses') ? 'navbar__link--active' : ''}`} id="nav-courses">
                        Courses
                    </Link>

                    <Link to="/about" className={`navbar__link ${isActive('/about') ? 'navbar__link--active' : ''}`} id="nav-about">
                        About Us
                    </Link>

                    {user ? (
                        <div className="navbar__user-section">
                            <Link to="/dashboard" className={`navbar__link ${isActive('/dashboard') ? 'navbar__link--active' : ''}`} id="nav-dashboard">
                                My Dashboard
                            </Link>
                            <div className="navbar__avatar" id="nav-avatar">
                                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                            </div>
                            <span className="navbar__user-name">{user.firstName}</span>
                            <button className="navbar__btn navbar__btn--outline" onClick={logout} id="nav-logout-btn">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="navbar__auth-buttons">
                            <Link to="/login" className={`navbar__btn navbar__btn--ghost ${isActive('/login') ? 'navbar__btn--active' : ''}`} id="nav-login-btn">
                                Login
                            </Link>
                            <Link to="/signup" className={`navbar__btn navbar__btn--filled ${isActive('/signup') ? 'navbar__btn--active' : ''}`} id="nav-signup-btn">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    id="nav-hamburger"
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;