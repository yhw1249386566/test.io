import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import Footer from './layouts/footer'
import Header from './layouts/header'
import { ThemeProvider } from './contexts'
import style from './index.less'

const { Content } = Layout

const Index = (props: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        const html = document.querySelector('html')
        if (theme === 'light') {
            html?.setAttribute('data-theme', theme)
            return
        }
        html?.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <ThemeProvider theme={theme}>
            <Layout className={style.layout}>
                <Header
                    theme={theme}
                    onToggleTheme={(theme) => setTheme(theme)}
                />

                <Content>{props.children}</Content>

                <Footer />
            </Layout>
        </ThemeProvider>
    )
}

export default Index
