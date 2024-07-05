import classnames from '@yomua/y-classnames'
import { forwardRef, memo, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

import { useTheme } from '@/hooks'

import Kbd from '../kbd'

import Style from './index.less'
import { useWindowEventListener } from '@yomua/y-hooks'

type SearchProps = {
    className?: string
    placeholder?: string
    kbd?: {
        text: string
    }[]
    event?: {
        name: keyof WindowEventMap
        handler: (event: any) => void
    }
    onChange?: (value: string) => void
    onClear?: () => void
}

function useDebouncedValue(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export default memo(
    forwardRef<HTMLInputElement, SearchProps>(function Search(props, ref) {
        const {
            className = '',
            placeholder = '',
            kbd = [],
            event = { name: 'click', handler: () => null },
            onClear = () => null,
            onChange = () => null,
        } = props

        const [inputValue, setInputValue] = useState('')

        // 既能对 onChange 防抖, 也能及时响应 inputValue 变化
        const debouncedValue = useDebouncedValue(inputValue, 150)

        const theme = useTheme()

        useEffect(() => {
            onChange(debouncedValue)
        }, [debouncedValue])

        useWindowEventListener(event.name, event.handler)

        return (
            <div
                className={classnames(
                    Style.search,
                    Style[`search-${theme}`],
                    className,
                )}
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={Style.icon}
                />

                <input
                    ref={ref}
                    value={inputValue}
                    type='text'
                    className={Style.input}
                    placeholder={placeholder}
                    onChange={(event) => {
                        setInputValue(event.target.value)
                    }}
                />

                {kbd.length > 0 && <Kbd data={kbd} />}

                <FontAwesomeIcon
                    icon={faXmark}
                    className={classnames(Style.icon, Style.clearIcon, {
                        [Style.hideClearIcon]: !inputValue,
                    })}
                    onClick={() => {
                        setInputValue('')
                        onClear()
                        ;(
                            ref as React.RefObject<HTMLInputElement>
                        )?.current?.focus()
                    }}
                />
            </div>
        )
    }),
)
