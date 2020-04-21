import {
    isNumber,
    isObject,
    isFunc,
    isString,
    isArray
} from "../../src/utils/type-of"

describe('utils:type-of',()=>{
   describe('isXX',()=>{
       test('should validate Number',()=>{
           expect(isNumber(1)).toBeTruthy()
           expect(isNumber('1')).toBeFalsy()
       })
       test('should validate Number',()=>{
           expect(isObject({name:'object'})).toBeTruthy()
           expect(isObject([1])).toBeFalsy()
       })
       test('should validate Function',()=>{
           expect(isFunc(function () {
               return 1
           })).toBeTruthy()
           expect(isFunc({})).toBeFalsy()
       })
       test('should validate String',()=>{
           expect(isString('string')).toBeTruthy()
           expect(isString(1)).toBeFalsy()
       })
       test('should validate Object',()=>{
           expect(isArray([1,2,3])).toBeTruthy()
           expect(isArray({1:1})).toBeFalsy()
       })
   })
})