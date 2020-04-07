import {createNode} from "../../utils/dom-utils/element"
import {dayHeaderClass, headerClass, headerMonthClass, headerYearClass} from "../../utils/class-name"
import {getEndMonth, getEndYear, updateHeader} from "../../store"
import {increaseMonth, increaseYear} from "./header"


export function createRightHeader() {
    return createNode({
        name: 'div',
        class: headerClass,
        children: [
            {
                name: 'span',
                val: getEndYear() + '年',
                class: headerYearClass,
                update: {method: updateHeader, name: 'rightYe'}
            },
            {
                name: 'span',
                val: getEndMonth() + '月',
                class: headerMonthClass,
                update: {method: updateHeader, name: 'rightMe'}
            },
            {
                name: 'svg',
                val: 'right',
                event: increaseMonth,
                style: 'right:30px',
                update: {method: updateHeader, name: 'ar'}
            },
            {name: 'svg', val: 'd-right', event: increaseYear, style: 'right:3px'}
        ]
    })
}

export function createRight(): (HTMLElement | Element) {
    return createNode({
        name: 'ul',
        class: dayHeaderClass,
        children: [
            {el:createRightHeader}
        ],
    })
}