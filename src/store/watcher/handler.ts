import Store from '../../store'
import {remove,on} from "../../event/eventListener"
import flexOptions from "../../types/options"

function showPopper():void {
    Store._togglePopover()
}

function watchReference(ref:HTMLElement) {
    const preElement = Store._getReference()
    const {trigger} = Store._getOptions() as flexOptions

    remove(preElement,(trigger as any),showPopper as any)
    on(ref,(trigger as any),showPopper as any)
}

function watchVisible(value:string) {
    if(value){
        const _prePop = Store._getPop()
        if(_prePop){

        }
        const _pop = _prePop
            ?_prePop
            :document.createElement('div')
        ;document.body.appendChild(_pop)
    }
}

export default {
    get(target:any, key:string, receiver:any) {
        return Reflect.get(target, key, receiver)
    },
    set(target:any, key:string, value:any, receiver:any) {
        if(key==='reference')watchReference(value)
        if(key==='visible')watchVisible(value)
        return Reflect.set(target, key, value, receiver)
    }
}