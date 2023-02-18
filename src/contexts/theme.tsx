import React, { createContext } from 'react'

interface ThemeProviderProps {
    theme: Theme
    children: React.ReactNode
}

export const ThemeContext = createContext('light')

const ThemeProvider = (props: ThemeProviderProps) => {
    const { theme } = props

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
