import { memo } from 'react'

import { useTheme } from '@/hooks'

import Style from './index.less'

type KbdProps = {
    data: {
        text: string
    }[]
}

export default memo(function Kbd(props: KbdProps) {
    const { data = [] } = props

    const theme = useTheme()

    return (
        <div className={`${Style.kbd} ${Style[`kbd-${theme}`]}`}>
            {data.map((item, i) => {
                const { text } = item

                return (
                    <kbd key={i} className={Style.item}>
                        {text}
                    </kbd>
                )
            })}
        </div>
    )
})
