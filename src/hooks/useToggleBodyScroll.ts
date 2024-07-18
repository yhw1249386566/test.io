import { useEffect } from 'react'

export default function useToggleBodyScroll(
    fn: () => boolean,
    dep: React.DependencyList,
) {
    useEffect(() => {
        const hideBodyScroll = fn()

        // 隐藏 body 滚动条
        if (hideBodyScroll) {
            document.body.style.overflow = 'hidden'

            return
        }

        // 显示 body 滚动条
        document.body.style.overflowY = 'auto'
    }, dep)
}
