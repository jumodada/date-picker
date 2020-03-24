import {getME, getOptions, getPop, getReference, getYe, getYear, openPopover} from '../index'
import {remove, on} from "../../event/eventListener"
import flexOptions from "../../types/options"
import {createPopover, updatePopover} from "../../template"
import {isElementExist} from "./is-element-exist"
import {setPopoverStyle} from "../../template/style"
import clickOutside from "../../utils/clickoutside"
import {appendChild} from "../../utils/dom-utils/element"

function watchReference(ref: HTMLElement) {
    const preElement = getReference()
    const {trigger} = getOptions() as flexOptions
     remove(preElement, (trigger as any), openPopover)
     remove(document.body,'click', clickOutside)
    if(ref){
        on(ref, (trigger as any), openPopover)
        on(document.body, 'click', clickOutside)
    }
}

function watchVisible(value: boolean) {
    const _p = getPop()
    const _exist = isElementExist(_p)
    if (!_exist) {
        createPopover()
        updatePopover(getPop(), value)
    } else {
        updatePopover(_p, value)
    }
}

function watchPageIdx(value:number) {
    const el = getYe()
    let year = getYear()
    let period = (year as number) + 9
    if(!el)return
    if(value===2){
        el.innerText =  year+' - '+period
    }
}

function watchPopover(value: HTMLElement) {
    if (value) {
        const _prePop = getPop()
        if (!isElementExist(_prePop)) {
            appendChild(value)
            setPopoverStyle(value)
        }

    }
}
function watchYear(value:number):void {
    const YE = getYe()
    if(YE){
        YE.innerText = value.toString()+'年'
    }
}
function watchMonth(value:number):void {
    const ME = getME()
    if(ME){
        ME.innerText = value.toString()+'月'
    }
}
export default {
    get(target: any, key: string, receiver: any) {
        return Reflect.get(target, key, receiver)
    },
    set(target: any, key: string, value: any, receiver: any) {
        if (key === 'reference') watchReference(value)
        if (key === 'visible') watchVisible(value)
        if (key === 'popover') watchPopover(value)
        if (key === 'year') watchYear(value)
        if (key === 'month') watchMonth(value)
        if (key === 'pageIdx') watchPageIdx(value)
        return Reflect.set(target, key, value, receiver)
    }
}