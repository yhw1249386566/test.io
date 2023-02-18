import { memo } from 'react'

import { Text, Direction } from '@/component'

import style from './index.less'

const DefaultFooter = () => {
    return (
        <Direction className={style.footer}>
            <Text type='primary'>©2021 Created by Yomua</Text>
        </Direction>
    )
}

export default memo(DefaultFooter)
