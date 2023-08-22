import React, { useEffect } from 'react'
import debounce from 'lodash/debounce'

const DEFAULT_OPTIONS = {
    delay: 300,
}

// 此 hook 的监听器将被防抖。
export default function useWindowEventListen(
    eventName: string,
    listenCallback: EventListenerOrEventListenerObject,
    options: {
        delay?: number // 单位：毫秒
    } = DEFAULT_OPTIONS,
    effect: React.DependencyList = [],
) {
    if (!eventName) {
        return
    }

    const { delay = 300 } = options

    useEffect(() => {
        window.addEventListener(eventName, debounce(listenCallback, delay))

        return () => {
            window.removeEventListener(
                eventName,
                debounce(listenCallback, delay),
            )
        }
    }, effect)
}
