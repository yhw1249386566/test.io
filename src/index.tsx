import React, { useState } from 'react'
import { Layout } from 'antd'
import style from './index.less'
import Footer from './layouts/footer'
import Header from './layouts/header'
import { ThemeProvider } from './contexts'

const { Content } = Layout

const Index = (props: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light')

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
