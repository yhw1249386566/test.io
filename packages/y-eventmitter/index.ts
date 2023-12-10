import Eventemitter3 from 'eventemitter3'

const EventemitterSymbol = Symbol()

/**
 * Reference:
 * https://nodejs.org/api/events.html#events
 * http://nodejs.cn/api-v16/events.html#events
 * https://www.npmjs.com/package/eventemitter3
 */
class SingletonEventemitter extends Eventemitter3 {
    /* eslint-disable no-use-before-define */
    // 因为 singleInstance - this 的类型是 SingletonEventemitter, 所以要使用 this.singleEventEmitterInstance 就得规定个 static singleEventEmitterInstance
    static singleEventEmitterInstance: Eventemitter3
    singleEventEmitterInstance: Eventemitter3 | null
    /* eslint-disable no-use-before-define */

    constructor() {
        super()
        this.singleEventEmitterInstance = null
    }

    static get singleInstance() {
        if (!this.singleEventEmitterInstance) {
            this.singleEventEmitterInstance = new Eventemitter3()
        }

        return this.singleEventEmitterInstance
    }

    // 注册一个事件并添加监听器
    on<T extends string | symbol>(
        event: T,
        fn: (...args: any[]) => void,
        context?: any,
    ): this {
        this.singleEventEmitterInstance?.on(event, fn, context)

        return this
    }

    // 触发某个注册的事件的监听器
    emit<T extends string | symbol>(event: T, ...args: any[]): boolean {
        console.log('_this', this)
        return this.singleEventEmitterInstance?.emit(event, ...args) ?? false
    }

    // 移除某个注册事件
    off<T extends string | symbol>(
        event: T,
        fn?: ((...args: any[]) => void) | undefined,
        context?: any,
        once?: boolean | undefined,
    ): this {
        this.singleEventEmitterInstance?.off(event, fn, context, once)

        return this
    }

    // 移除所有事件
    removeAllListeners(event?: string | symbol | undefined): this {
        this.singleEventEmitterInstance?.removeAllListeners(event)

        return this
    }
}

export default SingletonEventemitter

type A = typeof SingletonEventemitter
let Test: A
