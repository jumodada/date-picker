import {appendChild, createChildren, createEL, setAttr} from "../../utils/dom-utils/element"
import {
    getPage,
    getYe,
    getYear,
    pageTurning,
    plusMonth,
    plusYear,
    updateArrow,
    updateME,
    updateYE,
    updateYear
} from "../../store"
import {getMonth} from "../../utils/date"

export function setYearStyle(el:HTMLElement) {
    setAttr(el,'fl-dateTimePicker-header')
}
export function changeYear(val:number) {
    if(getPage()!==2){
        plusYear(val)
    }else{
        const ye = getYe()
        if(!ye)return
        const year= getYear()
        const curYear = year+(val>0?10:-10)
        updateYear(curYear)
        ye.innerText =curYear+' - '+(curYear+9)
    }
}

export function increaseYear() {
    changeYear(1)
}
export function reduceYear() {
    changeYear(-1)
}
export function increaseMonth() {
    plusMonth(1)
}
export function reduceMonth() {
    plusMonth(-1)
}

export function pageToggle() {
    if(getPage()!==2){
        pageTurning(2)
    }
}

export function createHeader() {
    const wrapper = createEL()
    const headerChildren = createChildren([
        {name:'svg',val:'d-left',event:reduceYear,style:'left:3px'},
        {name:'svg',val:'left',event:reduceMonth,style:'left:30px'},
        {name:'span',val:getYear()+'年',event:pageToggle,class:'fl-dateTimePicker-header-year'},
        {name:'span',val:getMonth()+'月',class:'fl-dateTimePicker-header-month'},
        {name:'svg',val:'right',event:increaseMonth,style:'right:30px'},
        {name:'svg',val:'d-right',event:increaseYear,style:'right:3px'},
    ])
    setYearStyle(wrapper)
    updateYE(headerChildren[2] as HTMLElement)
    updateME(headerChildren[3] as HTMLElement)
    updateArrow([headerChildren[1] as HTMLElement,headerChildren[4]as HTMLElement])
    appendChild(headerChildren,wrapper)
    return wrapper
}