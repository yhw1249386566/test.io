/* eslint-disable */

export type JSType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'null'
    | 'undefined'
    | 'bigInt'
    | 'symbol'
    | 'object'
    | 'array'
    | 'function'

export type EnvValueType<T extends JSType> = T extends 'function'
    ? Function
    : T extends 'array'
    ? any[]
    : T extends 'object'
    ? Record<string, any>
    : T extends 'undefined'
    ? undefined
    : T extends 'null'
    ? null
    : T extends 'boolean'
    ? boolean
    : T extends 'number'
    ? number
    : string
