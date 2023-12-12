export default <T = () => void>(fn: T, delay: number) => {
    let timer: NodeJS.Timeout

    return function (...rest) {
        if (timer) {
            clearTimeout(timer)
        }

        const args = Array.prototype.slice.call(rest)

        timer = setTimeout(() => {
            if (typeof fn === 'function') {
                fn.apply(this, args)
            }
        }, delay)
    }
}
