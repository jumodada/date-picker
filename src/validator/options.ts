import flexOptions, {placement} from "../types/options"
import {isObject} from "../utils/type-of"

const fixedOptions:flexOptions = {
    placement:[
        'top',
        'left',
        'bottom',
        'right'
    ],
    type:['date','date-range']
}
const checkLists:string[]= ['placement','type']

function _validate(name:string,options:any):boolean {
    if(name in options&&fixedOptions[name].indexOf(options[name]!)===-1){
        console.error(`Invalid ${name} format.`)
        return false
    }
    return true
}


export function _validateOptions(options:any):boolean {
    if(isObject(options))return checkLists.every(list => _validate(list,options))
    console.error('Invalid argument provided.Options must be an object')
    return false
}