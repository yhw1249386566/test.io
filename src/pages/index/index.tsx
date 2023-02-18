import { memo } from 'react'
import { useRouteMatch, history } from 'umi'
import { faClock, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

import { Card } from '@/component'
import Cute from '@/assets/img/cute.jpeg'

import style from './index.less'

function Index() {
    const match = useRouteMatch()

    function handleSwitchArticle(articleId: string) {
        return () => history.push(`/article/${articleId}`)
    }

    return (
        <div className={style.index} style={{ padding: 50 }}>
            <Card
                title='Animation'
                description='Animation'
                author='Yomua'
                time='2020年6月22日'
                img={Cute}
                tag={[
                    { name: 'CSS', icon: faClock, color: '#ee7959' },
                    {
                        name: '设计模式',
                        icon: faUserAstronaut,
                        color: '#ecb0c1',
                    },
                ]}
                onClick={handleSwitchArticle('1')}
            />

            <Card
                title='Animation'
                description='动画的的'
                author='Yomua'
                time='2020年6月22日'
                img={Cute}
                onClick={handleSwitchArticle('')}
                tag={[
                    { name: 'CSS', icon: faClock, color: '#ee7959' },
                    {
                        name: '设计模式',
                        icon: faUserAstronaut,
                        color: '#ecb0c1',
                    },
                ]}
            />
        </div>
    )
}

export default memo(Index)
