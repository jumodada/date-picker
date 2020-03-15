import {placement} from "../types/options"
import {isObject} from "../methods/type-of"
import {checkLists} from "../types/check"

const placement:placement[] = [
'top','top-start','top-end',
'left','left-start','left-end',
'bottom','bottom-start','bottom-end',
'right','right-start','right-end']

const checkLists:checkLists = [checkPlacement]

function checkPlacement(options:any):boolean {
    if("placement" in options&&placement.indexOf(options['placement']!)===-1){
        console.error('Invalid placement format.')
        return false
    }
    return true
}


export function checkOptions(options:any):boolean {
    if(isObject(options)){
        let _checkResult = checkLists.some(list=>list(options))
        return _checkResult
    }
    console.error('Options must be an object')
    return false
}