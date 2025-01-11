import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'system'
    });
    const [font, setFont] = useState(() => {
        return localStorage.getItem('font') || 'sans'
    })

    useEffect(() => {
        localStorage.setItem('theme', theme)

        //apply theme
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme)
        } else {
            root.classList.add(theme)
        }
    }, [theme])

    useEffect(() => {
         const root = window.document.documentElement;
         root.classList.remove('font-sans', 'font-serif','font-mono')
         root.classList.add(`font-${font}`)
    }, [font])

    return (
        <ThemeContext.Provider value={{theme, setTheme, font, setFont}}>
            {children}
        </ThemeContext.Provider>
    )
}

