import { memo } from 'react'
import { useRouteMatch, history } from 'umi'

import Cute from '@/assets/img/cute.jpeg'
import { Card } from '@/component'

import style from './index.less'

function Index() {
    const match = useRouteMatch()

    function handleSwitchFunction(functionName: string) {
        return () => history.push(`/function/${functionName}`)
    }

    return (
        <div className={style.index} style={{ padding: 50 }}>
            <Card
                img={Cute}
                title='Todo'
                author='Yomua'
                time='2023年2月18日'
                description='一个来自远古的待办事项'
                onClick={handleSwitchFunction('todo')}
                tag={[
                    {
                        name: 'Todo',
                        icon: 'bars',
                        color: '#ecb0c1',
                    },
                ]}
            />
        </div>
    )
}

export default memo(Index)
