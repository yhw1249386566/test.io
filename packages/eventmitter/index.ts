import Eventemitter from 'eventemitter3'

const EventemitterSymbol = Symbol()

/**
 * Reference:
 * https://nodejs.org/api/events.html#events
 * http://nodejs.cn/api-v16/events.html#events
 */
class SingletonEventemitter extends Eventemitter {
    /* eslint-disable no-use-before-define */
    static eventemitterInstance: SingletonEventemitter
    /* eslint-disable no-use-before-define */

    constructor(symbol: symbol) {
        super()
        if (symbol !== EventemitterSymbol) {
            throw new Error('意外的重复初始化 EventEmitter3')
        }
    }

    static get singleInstance() {
        if (!this.eventemitterInstance) {
            this.eventemitterInstance = new SingletonEventemitter(
                EventemitterSymbol,
            )
        }

        return this.eventemitterInstance
    }

    // 注册一个事件并添加监听器
    on<T extends string | symbol>(
        event: T,
        fn: (...args: any[]) => void,
        context?: any,
    ): this {
        this.on(event, fn, context)

        return this
    }

    // 触发某个注册的事件的监听器
    emit<T extends string | symbol>(event: T, ...args: any[]): boolean {
        return this.emit(event, ...args)
    }

    // 移除某个注册事件
    off<T extends string | symbol>(
        event: T,
        fn?: ((...args: any[]) => void) | undefined,
        context?: any,
        once?: boolean | undefined,
    ): this {
        this.off(event, fn, context, once)

        return this
    }

    // 移除所有事件
    removeAllListeners(event?: string | symbol | undefined): this {
        this.removeAllListeners(event)

        return this
    }
}

export default SingletonEventemitter
