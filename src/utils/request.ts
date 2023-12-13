type RequestOptions = {
    // 添加到 url 后: https://test.com?test=test
    queryString?: Record<string, string | string[]>
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

    if (contentType && contentType.includes('application/json')) {
        return response.json()
    } else {
        return response.text()
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
    console.log('Request Error: ', error)
    throw error
}

export default async function <Result = any>(
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

    if (queryString) {
        url += `?${Object.keys(queryString)
            .map((key) => {
                const value = queryString[key]
                if (Array.isArray(value)) {
                    let result = ''
                    value.forEach((item) => {
                        result += `${key}=${item}&`
                    })

                    return result.replace(/&$/, '')
                }

                return `${key}=${value}`
            })
            .join('&')}`
    }

    const options: RequestInit = {
        ...reset,
        headers,
    }

    return fetch(url, options)
        .then(checkResponse)
        .then(handleResponse)
        .then(handleResult)
        .catch(handleError)
}
