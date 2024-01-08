/* eslint-disable */

export type JSValueType =
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

export type EnvValueType<
    T extends JSValueType,
    DataType = T,
> = T extends 'function'
    ? Function
    : T extends 'bigInt'
    ? BigInt
    : T extends 'symbol'
    ? symbol
    : T extends 'undefined'
    ? undefined
    : T extends 'null'
    ? null
    : T extends 'boolean'
    ? boolean
    : T extends 'number'
    ? number
    : T extends 'array'
    ? DataType extends T
        ? T[]
        : DataType[]
    : T extends 'object'
    ? DataType extends T
        ? T
        : DataType
    : T extends 'string'
    ? DataType extends T
        ? string
        : DataType
    : DataType
