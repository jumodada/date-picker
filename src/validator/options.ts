import FlexOptions, {FixedOptions, placement} from "../types/options"
import {isArray, isObject, isString} from "../utils/type-of"

const fixedOptions:FixedOptions = {
    placement:[
        'top',
        'left',
        'bottom',
        'right'
    ],
    type:['date','date-range'],
    unlinkPanels:[true,false],
    format:(val:any)=>{
        return isString(val)
    }
}

const checkLists= ['placement','type','format']

function _validate(name:string,options:any):boolean {
    checkValue(name, options)
    return true
}

function checkFormat(name:string,options:any) {
    let method = fixedOptions[name as 'placement']
    if(isArray(method)){
        return fixedOptions[name as 'placement'].indexOf(options[name])===-1
    }else{
        return !(method as any)(options[name])
    }
}

function checkValue(name:string,options:any) {
    if(name in options&&checkFormat(name,options)){
        console.error(`Invalid ${name}`)
        return false
    }
}

export function validateOptions(options:any):boolean {
    if(isObject(options))return checkLists.every(list => _validate(list,options))
    console.error('Invalid argument provided.Options must be an object')
    return false
}