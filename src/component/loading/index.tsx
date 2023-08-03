import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import style from './index.less'

// 页面加载时显示的 loading
function Loading() {
    return (
        <div className={style.loading}>
            <FontAwesomeIcon className={style.loadingIcon} icon={faSpinner} />
        </div>
    )
}

export default memo(Loading)
