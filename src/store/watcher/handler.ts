import Store from '../../store'
import {remove,on} from "../../event/eventListener"
import flexOptions from "../../types/options"
import {showPopper} from "../../core/popper"

function handleReference(ref:HTMLElement) {
    const preElement = Store._getReference()
    const {trigger} = Store._getOptions() as flexOptions
    remove(preElement,(trigger as any),showPopper as any)
    on(ref,(trigger as any),showPopper as any)
}


export default {
    get(target:any, key:string, receiver:any) {
        return Reflect.get(target, key, receiver)
    },
    set(target:any, key:string, value:any, receiver:any) {
        if(key==='reference')handleReference(value)
        return Reflect.set(target, key, value, receiver)
    }
}