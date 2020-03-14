import {types} from "../types/methods"


const types:types= {
    Date: '[object Date]',
    Object: '[object Object]',
    Array: '[object Array]',
    String: '[object String]',
    Number: '[object Number]',
}

const toString = Object.prototype.toString

export const typeOf = (val:any, typeName:string) => toString.call(val) === (types as any)[typeName]
export const isNumber = (val:number) => typeOf(val, 'Number') && !Number.isNaN(val)
export const isObject = (val:object) => typeOf(val, 'Object')
export const isString = (val:string) => typeOf(val, 'String')
export const isArray = (val:[]) => typeOf(val, 'Array')
export const isDate = (val:Date) => typeOf(val, 'Date')
