import log from '@yomua/y-tlog'

type RequestOptions = {
    // 添加到 url 后: https://test.com?test=test
    queryString?: Record<string, string | string[]>
}

type RequestOnFulfilled = (config: RequestInit) => RequestInit
type RequestOnRejected = (error: Error) => Error

type ResponseOnFulfilled<V> = (response: Response) => V | Promise<V>
type ResponseOnRejected = (error: Error) => Error

type RequestInterceptors = {
    request?: {
        onFulfilled?: RequestOnFulfilled
        onRejected?: RequestOnRejected
    }[]
    response?: {
        onFulfilled?: ResponseOnFulfilled<any>
        onRejected?: ResponseOnRejected
    }[]
}

// 将拦截器存到全局内存中.
const interceptorsMap: RequestInterceptors = {
    request: [],
    response: [],
}

// 拦截器函数
const interceptors = {
    request: {
        // 添加拦截器到内存中
        use: function (
            onFulfilled?: RequestOnFulfilled,
            onRejected?: RequestOnRejected,
        ) {
            interceptorsMap.request?.push({
                onFulfilled,
                onRejected,
            })
        },
    },
    response: {
        use: function (
            onFulfilled?: ResponseOnFulfilled<any>,
            onRejected?: ResponseOnRejected,
        ) {
            interceptorsMap.response?.push({
                onFulfilled,
                onRejected,
            })
        },
    },
}

const checkResponse = (response: Response) => {
    const { status, statusText } = response

    if (status >= 200 && status < 300) {
        return response
    }

    const error = new Error(statusText)

    throw error
}

const handleResponse = (response: Response) => {
    const contentType = response.headers.get('content-type')

    let newResponse: Response | Promise<Response> | null = null

    interceptorsMap.response?.forEach(({ onFulfilled }) => {
        if (onFulfilled) {
            newResponse = onFulfilled(response)
        }
    })

    if (contentType && contentType.includes('application/json')) {
        return newResponse ?? response.json()
    } else {
        return newResponse ?? response.text()
    }
}

const handleResult = <R>(result: R) => {
    return {
        error: null,
        data: result,
        success: true,
    }
}

const handleError = (error: Error) => {
    log.error('Request Error: ', error as any)

    interceptorsMap.response?.forEach(({ onRejected }) => {
        if (onRejected) {
            onRejected(error)
        }
    })

    throw error
}

async function request<Result = any>(
    url: string,
    params?: RequestInit & RequestOptions,
): Promise<{
    data: Result
    success: boolean
    error: Error | null
}> {
    const { queryString, ...reset } = params ?? {}

    const headers: Record<string, string> = {
        Accept: '*/*',
        ...((params?.headers as Record<string, string>) ?? {}),
    }

    // queryString: ?a=1&a=2&b=3
    if (queryString) {
        url += `?${Object.keys(queryString)
            .map((key) => {
                const value = queryString[key]
                // 如果是数组 => a=1&a=2
                if (Array.isArray(value)) {
                    let result = ''
                    value.forEach((item) => {
                        result += `${key}=${item}&`
                    })

                    // 删除最后个 &
                    return result.replace(/&$/, '')
                }

                return `${key}=${value}`
            })
            .join('&')}`
    }

    let options: RequestInit = {
        ...reset,
        headers,
    }

    // 调用请求拦截
    interceptorsMap.request?.forEach(async ({ onFulfilled, onRejected }) => {
        if (onFulfilled) {
            options = onFulfilled(options)
        }
    })

    return fetch(url, options)
        .then(checkResponse)
        .then(handleResponse)
        .then(handleResult)
        .catch(handleError)
}

request.interceptors = interceptors

export default request
