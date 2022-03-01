import style from './index.less'
import { useTheme } from '@/hooks'
import { Text, Direction } from '@/component'

const DefaultFooter = () => {
    const themeContext = useTheme()

    return (
        <Direction
            className={style.footer}
            style={{
                backgroundColor: themeContext.primaryBgColor,
            }}>
            <Text type='title'>©2021 Created by Yomua</Text>
        </Direction>
    )
}

export default DefaultFooter
