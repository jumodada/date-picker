import {createNode} from "../../utils/dom-utils/element"
import {getState, plusMonth, plusYear, updateHeader, updateState} from "../../store"
import {getRealMonth} from "../../utils/date"
import {headerClass, headerMonthClass, headerYearClass} from "../../utils/class-name"
import {createNodeArguments} from "../../types/methods"

export function changeYear(val:number) {
    if(getState('pageIdx')!==2){
        plusYear(val)
    }else{
        const {ye} = getState('header')
        if(!ye)return
        const year= getState('year')
        const curYear = year+(val>0?10:-10)
        updateState(curYear,'year')
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

export function toYear() {
    if(getState('pageIdx')!==2){
        updateState(2,'pageIdx')
    }
}
export function toMonth() {
    if(getState('pageIdx')!==1){
        updateState(1,'pageIdx')
    }
}
export function createHeader() {
    let node:createNodeArguments = {
        name: 'div',
        class: [headerClass],
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
                val: getState('year') + '年',
                event: toYear,
                class: [headerYearClass],
                update: {method: updateHeader, name: 'ye'}
            },
            {
                name: 'span',
                val: getRealMonth() + '月',
                event: toMonth,
                class: [headerMonthClass],
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
    }
    return createNode(node)
}