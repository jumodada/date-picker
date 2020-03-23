import {appendChild, createChildren, createEL, setAttr} from "../../utils/dom-utils/element"

export function setYearStyle(el:HTMLElement) {
    setAttr(el,'fl-dateTimePicker-year-header')
}

export function createYear() {
    const wrapper = createEL()
    const yearChildren = createChildren([
        {name:'svg',val:'d-left'},
        {name:'span',val:'2018'},
        {name:'svg',val:'d-right'},
    ])
    setYearStyle(wrapper)
    appendChild(yearChildren,wrapper)
    return wrapper
}