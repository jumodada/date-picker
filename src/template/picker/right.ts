import {createNode} from "../../utils/dom-utils/element"
import {
    datepickerBodyClass,
    dayBodyClass,
    headerClass,
    headerMonthClass,
    headerYearClass,
    rightClass
} from "../../utils/class-name"
import {getEndMonth, getState, updateDP, updateHeader} from "../../store"
import {increaseMonth, increaseYear} from "./header"
import {_Event} from "../../types/event"
import {createDayHeader, createPageBody} from "./body"
import {dpKey} from "../../types/template"


export function createRightHeader() {
    return createNode({
        name: 'div',
        class: [headerClass],
        children: [
            {
                name: 'span',
                val: getState('endYear') + '年',
                class: [headerYearClass],
                update: {method: updateHeader, name: 'rightYe'}
            },
            {
                name: 'span',
                val: getEndMonth() + '月',
                class: [headerMonthClass],
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

export function createRightBody() {
    return createNode({
        class: [datepickerBodyClass],
        children: [
            {el: createDayHeader},
            {el: createRightDayBody}
        ]
    })
}

export function toSelectEndDate(e:_Event):void {
    // todo
}

export function createRightDayBody(): (HTMLElement | Element) {
    return createPageBody<dpKey>(
        42, toSelectEndDate, dayBodyClass, updateDP, 'rightBody')
}


export function createRight(): (HTMLElement | Element) {
    return createNode({
        name: 'div',
        class: [rightClass],
        children: [
            {el:createRightHeader},
            {el:createRightBody}
        ],
    })
}