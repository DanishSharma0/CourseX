import { createContext, useState } from "react";


export const ThemeContext = createContext();


function ThemeProvider({children}) {

    const [theme, setTheme] = useState('light');

    function toggleTheme() {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;