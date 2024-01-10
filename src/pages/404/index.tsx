import { memo, useCallback } from 'react'
import { history } from 'umi'
import { Button } from 'antd'

import { RouteLink } from '@/utils/constant'

export default memo(function NotFound() {
    const handleClick = useCallback(() => {
        history.push(`/${RouteLink.Index}`)
    }, [])

    return (
        <div>
            404
            <Button type='primary' onClick={handleClick}>
                Back Home
            </Button>
        </div>
    )
})
