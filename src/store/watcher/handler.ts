import Store from '../../store'
import {remove,on} from "../../event/eventListener"
import flexOptions from "../../types/options"
import {createPopover,updatePopover} from "../../popover"
import {isElementExist} from "./is-element-exist";
import {setStyle} from "../../popover/style"

function showPopper():void {
    Store._togglePopover()
}

function watchReference(ref:HTMLElement) {
    const preElement = Store._getReference()
    const {trigger} = Store._getOptions() as flexOptions

    remove(preElement,(trigger as any),showPopper as any)
    on(ref,(trigger as any),showPopper as any)
}

function watchVisible(value:boolean) {
        const _p = Store._getPop()
        !_p?createPopover():updatePopover(_p,value)
}
function watchPopover(value:HTMLElement) {
    if(value){
        const _prePop = Store._getPop()
        if(!isElementExist(_prePop)){
            document.body.appendChild(value)
            setStyle(value)
        }

    }
}

export default {
    get(target:any, key:string, receiver:any) {
        return Reflect.get(target, key, receiver)
    },
    set(target:any, key:string, value:any, receiver:any) {
        if(key==='reference')watchReference(value)
        if(key==='visible')watchVisible(value)
        if(key==='popover')watchPopover(value)
        return Reflect.set(target, key, value, receiver)
    }
}