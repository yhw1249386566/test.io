import React, { useState } from 'react'
import { Layout } from 'antd'
import { ThemeProvider } from '../../contexts'
import style from './index.less'
import Footer from '../footer'
import Header from '../header'

const { Content } = Layout

const Contain = (props: { children: React.ReactNode }) => {
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

export default Contain
