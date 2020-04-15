import {createNode} from "../../utils/dom-utils/element"
import {
    headerClass,
    headerMonthClass,
    headerYearClass,
    leftClass
} from "../../utils/class-name"
import {getState, updateHeader, updateState} from "../../store"
import {compareDate, getRealMonth} from "../../utils/date"
import {reduceMonth, reduceYear} from "./header"
import {createDay, handleSelectDate} from "./body"
import {_Event} from "../../types/event"

export function createLeftHeader() {
    return createNode({
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
                class: [headerYearClass],
                update: {method: updateHeader, name: 'ye'}
            },
            {
                name: 'span',
                val: getRealMonth() + '月',
                class: [headerMonthClass],
                update: {method: updateHeader, name: 'me'}
            }
        ]
    })
}

export function toSelectRangeDate(e:_Event,key:'date'|'endDate'='date'):void {
    let innerText = handleSelectDate(e,key)
    updateSelectRange(innerText)
}

export function updateSelectRange(innerText:string) {
    let selectRange:any = getState('selectRange').slice(0)
    if(selectRange.length===2)selectRange.length = 0
    selectRange.push(innerText)
    updateState(selectRange,'selectRange')
}
export function hoverUpdateSelectRange(innerText:string) {
    let selectRange:any = getState('selectRange').slice(0)
    selectRange[1] = innerText
    console.log(selectRange)
    updateState(selectRange,'selectRange')
}

export function hoverSelect(e:_Event,key:'date'|'endDate'='date') {
    if(getState('selectStatus')!=='selecting')return
    let innerText = handleSelectDate(e,key)
    hoverUpdateSelectRange(innerText)
}

export function createLeft(): (HTMLElement | Element) {
    return createNode({
        class: [leftClass],
        children: [
            {el:createLeftHeader},
            {el:createDay([
                {name:'click',event:toSelectRangeDate},
                {name:'mouseenter',event:hoverSelect},
                ],'body')},
        ],
    })
}