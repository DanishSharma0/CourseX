import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('sf_token');
        const savedUser = localStorage.getItem('sf_user');
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    function login(userData, authToken) {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('sf_token', authToken);
        localStorage.setItem('sf_user', JSON.stringify(userData));
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem('sf_token');
        localStorage.removeItem('sf_user');
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
