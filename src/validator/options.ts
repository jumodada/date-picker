import FlexOptions, {placement} from "../types/options"
import {isObject} from "../utils/type-of"

const fixedOptions:FlexOptions = {
    placement:[
        'top',
        'left',
        'bottom',
        'right'
    ],
    type:['date','date-range'],
    unlinkPanels:[true,false]
}

const checkLists= ['placement','type']

function _validate(name:string,options:any):boolean {
    if(name in options&&fixedOptions[name as 'placement'].indexOf(options[name]!)===-1){
        console.error(`Invalid ${name} format.`)
        return false
    }
    return true
}


export function validateOptions(options:any):boolean {
    if(isObject(options))return checkLists.every(list => _validate(list,options))
    console.error('Invalid argument provided.Options must be an object')
    return false
}