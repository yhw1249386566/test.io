import React, { useCallback, useEffect, useState } from 'react'
import { Layout } from 'antd'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
    faLinkedin,
    faTwitterSquare,
    faYoutubeSquare,
    faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'
// import IndexedDB from '@yomua/y-indexeddb'

import style from './index.less'
// import Footer from './layouts/footer'
import { Sidebar } from './component'
import Header from './layouts/header'
import storage from './utils/storage'
import { ThemeProvider } from './contexts'
import { LOCAL_STORAGE_NAME } from './utils/constant'

// Ref: https://docs.fontawesome.com/web/use-with/react/add-icons/#using-the-library
// 添加 fontawesome 免费版: https://fontawesome.com/search?q=menu&o=r&m=free
library.add(fas, faLinkedin, faTwitterSquare, faYoutubeSquare, faFacebookSquare)

// 初始化 IndexedDB
// 注意: 目前不需要用它
// IndexedDB.singleInstance.open({
//     dbVersion: 1,
//     dbName: 'yomuaDB',
//     dbStoreName: 'yomua',
//     specifyKey: 'filepath',
// })

// 此文件匹配路由 '/', 所以可以认为此文件类似入口文件;
// 为什么说类似? 因为 umi 已经配置了入口文件(使用者无感知), src/.umi/umi.ts,
// => Ref: /umi_webpack_dev.js 或 umi_webpack_prod.js - entry 字段
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

        html.setAttribute(LOCAL_STORAGE_NAME.DATA_THEME, theme)
    }, [theme])

    // 恢复用户上一次选择的主题
    useEffect(() => {
        const localTheme = storage.getLocalStorage<'string', Theme>(
            LOCAL_STORAGE_NAME.DATA_THEME,
        )

        if (localTheme) {
            setTheme(localTheme)
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Layout className={style.layout}>
                <Header theme={theme} onToggleTheme={handleChangeTheme} />

                <Layout.Content className={style.container}>
                    <Sidebar />
                    {props.children}
                </Layout.Content>

                {/* <Footer /> */}
            </Layout>
        </ThemeProvider>
    )
}

export default Index
