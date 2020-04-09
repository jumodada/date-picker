import {
    getEndMonth, getOptions,
    getState,
    openPopover,
    updateState
} from "../../index"
import {on, remove} from "../../../event/eventListener"
import clickOutside from "../../../utils/clickoutside"
import {isElementExist} from "../../../utils/dom-utils/is-element-exist"
import {createPopover, updatePopover} from "../../../template"
import {appendChild} from "../../../utils/dom-utils/element"
import {setPopoverStyle} from "../../../template/style"
import {renderDate, renderYear} from "../../../template/picker/body"

export function watchOptions() {
// todo
}
export function watchRect() {
// todo
}

export function watchDate(value:Date) {
    const year = value.getFullYear()
    const month = value.getMonth()+1
    updateState(year,'year')
    updateState(month,'month')
    renderDate()
}
export function watchReference(ref: HTMLElement) {
    const preElement = getState('reference')
    remove(preElement, 'click', openPopover)
    remove(document.body,'click', clickOutside)
    if(ref){
        on(ref, 'click', openPopover)
        on(document.body, 'click', clickOutside)
    }
}
export function watchVisible(value: boolean) {
    const _p = getState('popover')
    const _exist = isElementExist(_p)
    if (!_exist) {
        createPopover()
        updatePopover(getState('popover'), value)
    } else {
        updatePopover(_p, value)
    }
}

export function elementShow(elements:any[],isHidden:boolean) {
    const display = isHidden?'none':''
    elements.forEach(arg=>{
        arg.forEach((_a: { style: { display: string } })=>_a.style.display=display)
    })
}
export function watchPageIdx(value:number) {
    const {ye,me,ar,al} = getState('header')
    const {header,body} = getState('dayPage')
    const {month,year} = getState('otherPage')
    const yearVal = getState('year')
    let period = (yearVal as number) + 9
    const date = [me,al,ar,header,body]
    const $elements = [date,[month],[year]]
    if(!ye)return
    if(value===2){
        ye.innerText =  yearVal+' - '+period
    }
    elementShow($elements.splice(value,1),false)
    elementShow($elements,true)
}
export function watchPopover(value: HTMLElement) {
    if (value) {
        const _prePop = getState('popover')
        if (!isElementExist(_prePop)) {
            appendChild(value)
            setPopoverStyle(value)
        }

    }
}

export function watchYear(value:number):void {
    const page = getState('pageIdx')
    const {ye} = getState('header')
    if(ye){
        ye.innerText = value.toString()+'年'
    }
    if(getState('year')===value)return
    if(page===2){
        renderYear()
    }else if(page===0){
        renderDate()
    }
}
const monthMethods = {
    date:(value:number)=>{
     // do nothing
    },
    'date-range':(value:number)=>{
        const {rightMe,rightYe} = getState('header')
        const endYear = getState('endYear')
        if(rightMe){
            rightMe.innerText = getEndMonth(value).toString()+'月'
        }
        if(rightYe){
            rightYe.innerText = endYear.toString()+'年'
        }
    }
}

export function watchMonth(value:number):void {
    if(getState('month')===value)return
    const {me} = getState('header')
    const {type} = getOptions()
    if(me){
        me.innerText = value.toString()+'月'
    }
    monthMethods[type as 'date'](value)
    renderDate()
}