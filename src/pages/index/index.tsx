import { faClock, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { useRouteMatch, history } from 'umi'

import Cute from '@/assets/img/cute.jpeg'
import { Card } from '@/component'

import style from './index.less'

export default function Index() {
    const match = useRouteMatch()

    function handleSwitchArticle(articleId: string) {
        return () => history.push(`/article/${articleId}`)
    }

    return (
        <div className={style.index} style={{ padding: 50 }}>
            <Card
                title='Animation'
                text='Animation'
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
                text='动画的的'
                author='Yomua'
                time='2020年6月22日'
                img={Cute}
                onClick={handleSwitchArticle('')}
            />
        </div>
    )
}
