import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.less'

function Loading() {
    return (
        <div className={style.loading}>
            <FontAwesomeIcon className={style.loadingIcon} icon='spinner' />
        </div>
    )
}

export default memo(Loading)
