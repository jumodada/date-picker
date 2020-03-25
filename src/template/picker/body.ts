import {appendChild, createChildren, createEL} from "../../utils/dom-utils/element";
import {getYear} from "../../store"
import {getMonth} from "../../utils/date";
import {increaseMonth, increaseYear, pageToggle, reduceMonth, reduceYear, setYearStyle} from "./header";


export function createDayHeader() {

}

export function createBody() {
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
    appendChild(headerChildren,wrapper)
    return wrapper
}