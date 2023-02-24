import { Configuration, OpenAIApi } from 'openai'

export default async function request(data) {
    const { inputText, apiKey = '', stop = [' Human:', ' AI:'] } = data ?? {}

    const configuration = new Configuration({
        apiKey,
    })

    const openai = new OpenAIApi(configuration)

    if (!configuration.apiKey) {
        return {
            success: false,
            error: {
                message: '请输入 OpenAi key.',
            },
            data: null,
        }
    }

    const result = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: inputText,
        temperature: 0.6,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop,
    })

    return {
        success: true,
        error: null,
        data: result.data.choices[0].text,
    }
}
