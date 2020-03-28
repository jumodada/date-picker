import {createNode} from "../../utils/dom-utils/element"
import {getHeader, getPage, getYear, pageTurning, plusMonth, plusYear, updateHeader, updateYear} from "../../store"
import {getRealMonth} from "../../utils/date"
import {headerClass, headerMonthClass, headerYearClass} from "../../utils/class-name"

export function changeYear(val:number) {
    if(getPage()!==2){
        plusYear(val)
    }else{
        const {ye} = getHeader()
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
    return createNode({
        name: 'div',
        class: headerClass,
        children: [
            {name: 'svg', val: 'd-left', event: reduceYear, style: 'left:3px'},
            {
                name: 'svg',
                val: 'left',
                event: reduceMonth,
                style: 'left:30px',
                update: {method: updateHeader, name: 'al'}
            },
            {
                name: 'span',
                val: getYear() + '年',
                event: pageToggle,
                class: headerYearClass,
                update: {method: updateHeader, name: 'ye'}
            },
            {
                name: 'span',
                val: getRealMonth() + '月',
                class: headerMonthClass,
                update: {method: updateHeader, name: 'me'}
            },
            {
                name: 'svg',
                val: 'right',
                event: increaseMonth,
                style: 'right:30px',
                update: {method: updateHeader, name: 'ar'}
            },
            {name: 'svg', val: 'd-right', event: increaseYear, style: 'right:3px'},
        ]
    })
}