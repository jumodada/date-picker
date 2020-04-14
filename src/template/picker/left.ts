import {createNode} from "../../utils/dom-utils/element"
import {
    headerClass,
    headerMonthClass,
    headerYearClass,
    leftClass
} from "../../utils/class-name"
import {getState, updateDate, updateHeader, updateState} from "../../store"
import {getRealMonth, joinDate} from "../../utils/date"
import {reduceMonth, reduceYear} from "./header"
import {createDay} from "./body"
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
    let {innerText, dataset} = e.target
    let view = dataset.view
    let [year, month] = [getState('year'), getState('month')]
    if (view === 'pre' && --month === 0) {
        year--
        month = 12
    } else if (view === 'next' && ++month === 13) {
        year++
        month = 1
    }
    innerText = joinDate<number, string>(year, month, innerText)
    updateState(true,'isSelecting')
    updateDate(innerText,key)

}

export function createLeft(): (HTMLElement | Element) {
    return createNode({
        class: [leftClass],
        children: [
            {el:createLeftHeader},
            {el:createDay(toSelectRangeDate,'body')},
        ],
    })
}