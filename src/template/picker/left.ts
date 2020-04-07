import {createNode} from "../../utils/dom-utils/element"
import {headerClass, headerMonthClass, dayHeaderClass, headerYearClass} from "../../utils/class-name"
import {getYear, updateHeader} from "../../store"
import {getRealMonth} from "../../utils/date"
import {reduceMonth, reduceYear} from "./header"


export function createLeftHeader() {
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
                class: headerYearClass,
                update: {method: updateHeader, name: 'ye'}
            },
            {
                name: 'span',
                val: getRealMonth() + '月',
                class: headerMonthClass,
                update: {method: updateHeader, name: 'me'}
            }
        ]
    })
}

export function createLeft(): (HTMLElement | Element) {
    return createNode({
        name: 'ul',
        class: dayHeaderClass,
        children: [
            {el:createLeftHeader}
        ],
    })
}