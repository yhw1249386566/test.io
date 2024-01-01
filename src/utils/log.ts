const LOG_COLOR_MAP = {
    error: 'color: #fff; background-color: #f00',
    info: 'color: #fff; background-color: #00f',
    logo: 'color: #fff; background-color: #000',
    trace: 'color: #000; background-color: #fff',
}

const logoGroup = (
    title: string,
    options: {
        sub: {
            type: 'error' | 'info' | 'log' | 'trace'
            message: string | Error | unknown
        }[]
    },
) => {
    const { sub = [] } = options ?? {}

    console.group(`%c${title}`, 'color: #fff; background-color: #000')

    sub.forEach((item) => {
        const { type, message } = item

        console[type](`%c${message}`, LOG_COLOR_MAP[type])
    })

    console.groupEnd()
}

export default {
    info: console.info,
    warn: console.warn,
    trace: console.trace,
    error: console.error,
    log: console.log,
    group: logoGroup,
}
