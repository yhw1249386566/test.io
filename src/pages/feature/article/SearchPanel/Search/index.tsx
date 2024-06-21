import classnames from '@yomua/y-classnames'
import { forwardRef, memo, useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

import { useTheme } from '@/hooks'

import Style from './index.less'

type SearchProps = {
    onChange: (value: string) => void
    onClear: () => void
    className?: string
    placeholder?: string
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

export default forwardRef<HTMLInputElement, SearchProps>(function Search(
    props,
    ref,
) {
    const { onChange, onClear, className = '', placeholder = '' } = props

    const [inputValue, setInputValue] = useState('')

    // 既能对 onChange 防抖, 也能及时响应 inputValue 变化
    const debouncedValue = useDebouncedValue(inputValue, 150)

    const theme = useTheme()

    useEffect(() => {
        onChange(debouncedValue)
    }, [debouncedValue])

    return (
        <div
            className={classnames(
                Style.search,
                Style[`search-${theme}`],
                className,
            )}
        >
            <FontAwesomeIcon icon={faMagnifyingGlass} className={Style.icon} />

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

            <FontAwesomeIcon
                icon={faXmark}
                className={classnames(Style.icon, Style.clearIcon)}
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
})
