import { memo } from 'react'
import style from './index.less'

function Type() {
    return <div className={style.about}>about</div>
}

export default memo(Type)
