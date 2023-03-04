import { memo, useEffect, useState } from 'react'
import _ from 'lodash'
import { useParams } from 'umi'

import Error from '../404'

function Article() {
    const { 0: path } = useParams()

    const [data, setData] = useState('')

    useEffect(() => {
        async function initPage() {
            try {
                const data = await import(`@/article/${path}.html`)
                setData(data?.default)
            } catch (error) {
                console.error(error)
            }
        }

        initPage()
    }, [])

    return (
        <div>
            {data ? (
                <div dangerouslySetInnerHTML={{ __html: data }} />
            ) : (
                <Error />
            )}
        </div>
    )
}

export default memo(Article)
