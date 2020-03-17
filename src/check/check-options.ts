import {placement, trigger} from "../types/options"
import {isObject} from "../methods/type-of"

const fixedOptions = {
    placement:[
        'top','top-start','top-end',
        'left','left-start','left-end',
        'bottom','bottom-start','bottom-end',
        'right','right-start','right-end'
    ],
    trigger:['click','hover']
}
const checkLists:string[]= ['placement','trigger']

function _check(name:string,options:any):boolean {
    if(name in options&&(fixedOptions as any)[name].indexOf(options[name]!)===-1){
        console.error(`Invalid ${name} format.`)
        return false
    }
    return true
}


export function checkOptions(options:any):boolean {
    if(isObject(options))return checkLists.every(list => _check(list,options))
    console.error('Invalid argument provided.Options must be an object')
    return false
}