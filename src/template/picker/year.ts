import {appendChild, createChildren, createEL, setAttr} from "../../utils/dom-utils/element"
import {getYear, plusYear, updateYE} from "../../store"

export function setYearStyle(el:HTMLElement) {
    setAttr(el,'fl-dateTimePicker-year-header')
}

export function increase() {
    plusYear(1)
}

export function reduce() {
    plusYear(-1)
}

export function createYear() {
    const wrapper = createEL()
    const yearChildren = createChildren([
        {name:'svg',val:'d-left',event:reduce},
        {name:'svg',val:'left'},
        {name:'span',val:getYear()},
        {name:'svg',val:'right'},
        {name:'svg',val:'d-right',event:increase},
    ])
    setYearStyle(wrapper)
    updateYE(yearChildren[2] as HTMLElement)
    appendChild(yearChildren,wrapper)
    return wrapper
}