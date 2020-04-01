import {
    getDP,
    getHeader,
    getMonth, getOP,
    getOptions, getPage,
    getPop,
    getReference,
    getYear,
    openPopover, updateMonth,
    updateYear
} from "../../index"
import flexOptions from "../../../types/options"
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
    updateYear(year)
    updateMonth(month)
    renderDate()
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
    const _p = getPop()
    const _exist = isElementExist(_p)
    if (!_exist) {
        createPopover()
        updatePopover(getPop(), value)
    } else {
        updatePopover(_p, value)
    }
}

export function isShow(arr:HTMLElement[],isShow:boolean) {
    const display = isShow?'':'none'
    arr.forEach(_a=>_a.style.display=display)
}
export function watchPageIdx(value:number) {
    const {ye,me,ar,al} = getHeader()
    const {header,body} = getDP()
    const {month,year} = getOP()
    const yearVal = getYear()
    let period = (yearVal as number) + 9
    if(!ye||!me||!ar||!al||!header||!body)return
    if(value===2){
        ye.innerText =  yearVal+' - '+period
        isShow([me,al,ar,header,body,month],false)
        isShow([year],true)
    }else if(value===1){
        isShow([me,al,ar,header,body,year],false)
        isShow([month],true)
    }else if(value===0){
        isShow([me,al,ar,header,body],true)
        isShow([month,year],false)
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
    const page = getPage()
    const {ye} = getHeader()
    if(ye){
        ye.innerText = value.toString()+'年'
    }
    if(getYear()===value)return
    if(page===2){
        renderYear()
    }else if(page===0){
        renderDate()
    }
}
export function watchMonth(value:number):void {
    if(getMonth()===value)return
    const page = getPage()
    const {me} = getHeader()
    if(me){
        me.innerText = value.toString()+'月'
    }
    if(page===0)renderDate()
}