import React, { useState, createContext, useEffect } from 'react'
import { dark, light } from '../theme'

interface ThemeProviderProps {
    theme: Theme
    children: React.ReactNode
}

export const ThemeContext = createContext(light)

const ThemeProvider = (props: ThemeProviderProps) => {
    const { theme } = props

    const [currentTheme, setCurrentTheme] = useState(light)

    useEffect(() => {
        if (theme === 'light') {
            setCurrentTheme(light)
            return
        }
        setCurrentTheme(dark)
    }, [theme])

    return (
        <ThemeContext.Provider value={currentTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
