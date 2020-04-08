import {
    getDP, getEndMonth, getEndYear,
    getHeader,
    getMonth, getOP, getOptions, getPage,
    getPop,
    getReference,
    getYear,
    openPopover, updateMonth,
    updateYear
} from "../../index"
import {on, remove} from "../../../event/eventListener"
import clickOutside from "../../../utils/clickoutside"
import {isElementExist} from "../../../utils/dom-utils/is-element-exist"
import {createPopover, updatePopover} from "../../../template"
import {appendChild} from "../../../utils/dom-utils/element"
import {setPopoverStyle} from "../../../template/style"
import {renderDate, renderYear} from "../../../template/picker/body"
import nexttick from "../../../utils/nexttick";

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
    remove(preElement, 'click', openPopover)
    remove(document.body,'click', clickOutside)
    if(ref){
        on(ref, 'click', openPopover)
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

export function elementShow(elements:any[],isHidden:boolean) {
    const display = isHidden?'none':''
    elements.forEach(arg=>{
        arg.forEach((_a: { style: { display: string } })=>_a.style.display=display)
    })
}
export function watchPageIdx(value:number) {
    const {ye,me,ar,al} = getHeader()
    const {header,body} = getDP()
    const {month,year} = getOP()
    const yearVal = getYear()
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
const monthMethods = {
    date:(value:number)=>{
     // do nothing
    },
    'date-range':(value:number)=>{
        const {rightMe,rightYe} = getHeader()
        const endYear = getEndYear(value)
        if(rightMe){
            rightMe.innerText = getEndMonth(value).toString()+'月'
        }
        if(rightYe){
            rightYe.innerText = endYear.toString()+'年'
        }
    }
}

export function watchMonth(value:number):void {
    if(getMonth()===value)return
    const {me} = getHeader()
    const {type} = getOptions()
    if(me){
        me.innerText = value.toString()+'月'
    }
    monthMethods[type as 'date'](value)
    renderDate()
}