import {Types} from "../types/methods"
const types:Types= {
    Date: '[object Date]',
    Object: '[object Object]',
    Array: '[object Array]',
    String: '[object String]',
    Number: '[object Number]',
    Function: '[object Function]'
}
const toString = Object.prototype.toString
const typeOf = (val:any, typeName:string) => toString.call(val) === (types as any)[typeName]

export const isNumber = (val:any) => typeOf(val, 'Number') && !Number.isNaN(val)
export const isObject = (val:any) => typeOf(val, 'Object')
export const isFunc = (val:any) => typeOf(val, 'Function')
export const isString = (val:any) => typeOf(val, 'String')
export const isArray = (val:any) => typeOf(val, 'Array')
