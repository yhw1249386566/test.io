import React, { useCallback, useEffect, useState } from 'react'
import { Layout } from 'antd'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faLinkedin,
    faTwitterSquare,
    faYoutubeSquare,
    faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'

import IndexedDB from '~/packages/indexed-db'

import style from './index.less'
import Footer from './layouts/footer'
import { Sidebar } from './component'
import Header from './layouts/header'
import { ThemeProvider } from './contexts'

library.add(fas, faFacebookSquare, faYoutubeSquare, faLinkedin, faTwitterSquare)

IndexedDB.singleInstance.open({
    dbName: 'yomuaDB',
    dbVersion: 1,
    dbStoreName: 'yomua',
    specifyKey: 'filepath',
})

const Index = (props: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light')

    const handleChangeTheme = useCallback((theme: Theme) => {
        setTheme(theme)
    }, [])

    useEffect(() => {
        const html = document.querySelector('html')

        if (!html) {
            return
        }

        html.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <ThemeProvider theme={theme}>
            <Layout className={style.layout}>
                <Header theme={theme} onToggleTheme={handleChangeTheme} />

                <Layout.Content className={style.content}>
                    <Sidebar />

                    {props.children}
                </Layout.Content>

                <Footer />
            </Layout>
        </ThemeProvider>
    )
}

export default Index
