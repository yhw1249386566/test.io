import { useEffect } from 'react'

export default (
    callback: (config: { lock: boolean }) => void,
    deps = [],
    returnEffect: () => void = () => null,
) => {
    useEffect(() => {
        const config = { lock: false }

        callback(config)

        // 将上一次 useEffect 中的 config.lock 设置为 true
        return () => {
            config.lock = true

            returnEffect && returnEffect()
        }
    }, deps)
}
