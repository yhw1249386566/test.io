import style from './index.less'
import { Text, Direction } from '@/component'

const DefaultFooter = () => {
    return (
        <Direction className={style.footer}>
            <Text type='title'>©2021 Created by Yomua</Text>
        </Direction>
    )
}

export default DefaultFooter
