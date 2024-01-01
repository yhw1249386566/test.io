import useWindowEventListener from '../useWindowEventListener'

// 修改当前显示的 url
export default function useURL(
    stateObj: Record<string, any> = {},
    title = '',
    url = '',
    listener: (event: PopStateEvent) => void = () => void 0,
    options?: {
        state?: any // listener - event.state 中的数据
        go?: boolean // 修改 url 时是否直接跳转过去
    },
) {
    const { go = false, state = null } = options ?? {}

    window.history.replaceState(stateObj, title, url)

    if (go) {
        const popStateEvent = new PopStateEvent('popstate', { state })
        window.dispatchEvent(popStateEvent)
    }

    useWindowEventListener('popstate', listener as any, [listener])
}
