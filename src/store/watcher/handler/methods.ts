import {getArrow, getME, getOptions, getPop, getReference, getYe, getYear, openPopover} from "../../index"
import flexOptions from "../../../types/options"
import {on, remove} from "../../../event/eventListener"
import clickOutside from "../../../utils/clickoutside"
import {isElementExist} from "../is-element-exist"
import {createPopover, updatePopover} from "../../../template"
import {appendChild} from "../../../utils/dom-utils/element"
import {setPopoverStyle} from "../../../template/style"

export function watchOptions() {
// todo
}
export function watchRect() {
// todo
}
export function watchYe() {
// todo
}
export function watchMe() {
// todo
}
export function watchArrowLeft() {
// todo
}
export function watchArrowRight() {
// todo
}
export function watchReference(ref: HTMLElement) {
    const preElement = getReference()
    const {trigger} = getOptions() as flexOptions
    remove(preElement, (trigger as any), openPopover)
    remove(document.body,'click', clickOutside)
    if(ref){
        on(ref, (trigger as any), openPopover)
        on(document.body, 'click', clickOutside)
    }
}
export function watchVisible(value: boolean) {
    console.log(value)
    const _p = getPop()
    const _exist = isElementExist(_p)
    if (!_exist) {
        createPopover()
        updatePopover(getPop(), value)
    } else {
        updatePopover(_p, value)
    }
}
export function watchPageIdx(value:number) {
    const ye = getYe()
    const me = getME()
    let year = getYear()
    const arrow =getArrow()
    let period = (year as number) + 9
    if(!ye||!me)return
    if(value===2){
        ye.innerText =  year+' - '+period
        me.style.display = 'none'
        arrow.forEach(_a=>(_a as HTMLElement).style.display='none')
    }else if(value===0){
        me.style.display = 'block'
        arrow.forEach(_a=>(_a as HTMLElement).style.display='block')
    }
}
export function watchPopover(value: HTMLElement) {
    if (value) {
        const _prePop = getPop()
        if (!isElementExist(_prePop)) {
            appendChild(value)
            setPopoverStyle(value)
        }

    }
}
export function watchYear(value:number):void {
    const YE = getYe()
    if(YE){
        YE.innerText = value.toString()+'年'
    }
}
export function watchMonth(value:number):void {
    const ME = getME()
    if(ME){
        ME.innerText = value.toString()+'月'
    }
}