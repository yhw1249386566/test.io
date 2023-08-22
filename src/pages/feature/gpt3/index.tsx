import { useRef, useState, memo, useEffect } from 'react'
import classnames from 'classnames'

import { storage } from '@/utils'
import { Text, Direction } from '@/component'

import request from './request'

import style from './index.less'
import { useTheme } from '@/hooks'

enum Sequence {
    Start = 'You: ',
    Stop = 'AI: ',
}

function GPT3() {
    const [apiKey, setApiKey] = useState('')
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState<string>(Sequence.Start)

    const theme = useTheme()

    const textareaRef = useRef({ scrollTop: 0, scrollHeight: 0, focus })

    function handleScrollBottomTextarea() {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight
        textareaRef.current.focus()
    }

    function handleChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value)
    }

    function handleChangeApiKey(e: React.ChangeEvent<HTMLInputElement>) {
        setApiKey(e.target.value)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)
        try {
            const response = await request({
                apiKey,
                inputText: value,
                stop: [Sequence.Start, Sequence.Stop],
            })
            const { success, error, data } = response

            if (!success) {
                alert(error?.message ?? '异常请求。')
                return
            }

            const textareaValue = `${value}${data}\n${Sequence.Start}`

            setValue(textareaValue)

            storage.saveLocalStorage({
                key: 'gpt3_chat_information',
                value: textareaValue,
            })

            handleScrollBottomTextarea()
        } catch (error) {
            alert('失败的请求。')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const gpt3Info = storage.getLocalStorage('gpt3_chat_information')

        if (gpt3Info) {
            setValue(gpt3Info)
        }
    }, [])

    return (
        <div className={classnames(style.gpt3, style[`gpt3-${theme}`])}>
            <Direction
                className={style.extraInfo}
                mode='column'
                alignItems='center'
                justifyContent='center'
            >
                <input
                    placeholder='Api Key'
                    className={style.apiKey}
                    value={apiKey}
                    onChange={handleChangeApiKey}
                />

                <Text className={style.warning}>
                    请注意：{' '}
                    <a
                        href='https://platform.openai.com/docs/models/gpt-3'
                        rel='noreferrer'
                        target='_blank'
                    >
                        Gpt3
                    </a>{' '}
                    最多只支持记忆 4096 个 token 的上下文。
                </Text>

                <div className={style.submitBox}>
                    <div onClick={handleSubmit} className={style.submit}>
                        <Text>Submit</Text>
                    </div>
                </div>
            </Direction>

            <div className={style.gpt3Chat}>
                <textarea
                    className={style.textarea}
                    ref={textareaRef as any}
                    rows={20}
                    placeholder='Start Chat'
                    value={value}
                    onChange={handleChangeTextarea}
                />

                {loading && (
                    <Text className={style.loading}>数据请求中，请稍等...</Text>
                )}
            </div>
        </div>
    )
}

export default memo(GPT3)
