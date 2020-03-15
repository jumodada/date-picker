import flexOptions, {placement} from "../types/options";
import {isObject} from "../methods/type-of";

const placement:placement[] = [
'top','top-start','top-end',
'left','left-start','left-end',
'bottom','bottom-start','bottom-end',
'right','right-start','right-end']

export function checkOptions(options:flexOptions):boolean {
    if(isObject(options)){
        if('placement' in options&&placement.indexOf(options['placement']!)===-1){
             console.error('placement format error')
            return false
        }
        return true
    }
    console.error('Options must be an object')
    return false
}