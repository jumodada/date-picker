import {appendChild, createChildren, createEL, setAttr} from "../../utils/dom-utils/element"
import {getPage, getYear, pageTurning, plusMonth, plusYear, updateME, updateYE} from "../../store"
import {getMonth} from "../../utils/date"

export function setYearStyle(el:HTMLElement) {
    setAttr(el,'fl-dateTimePicker-year-header')
}

export function increaseYear() {
    plusYear(1)
}
export function increaseMonth() {
    plusMonth(1)
}
export function reduceMonth() {
    plusMonth(-1)
}

export function reduceYear() {
    plusYear(-1)
}
export function pageToggle() {
    if(getPage()!==2){
        pageTurning(2)
    }
}

export function createHeader() {
    const wrapper = createEL()
    const headerChildren = createChildren([
        {name:'svg',val:'d-left',event:reduceYear},
        {name:'svg',val:'left',event:reduceMonth},
        {name:'span',val:getYear()+'年',event:pageToggle},
        {name:'span',val:getMonth()+'月'},
        {name:'svg',val:'right',event:increaseMonth},
        {name:'svg',val:'d-right',event:increaseYear},
    ])
    setYearStyle(wrapper)
    updateYE(headerChildren[2] as HTMLElement)
    updateME(headerChildren[3] as HTMLElement)
    appendChild(headerChildren,wrapper)
    return wrapper
}