import {createNode} from "../../utils/dom-utils/element"
import {
    datepickerBodyClass,
    dayBodyClass,
    headerClass,
    headerMonthClass,
    headerYearClass,
    rightClass
} from "../../utils/class-name"
import {getState, plusMonth, plusYear, updateDP, updateHeader} from "../../store"
import {createDayHeader, createPageBody} from "./body"
import {dpKey} from "../../types/template"
import {toSelectRangeDate} from "./left"
import {_Event} from "../../types/event"


function increaseEndMonth() {
    plusMonth(1,'endMonth')
}
function increaseEndYear() {
    plusYear(1,'endYear')
}

export function createRightHeader() {
    return createNode({
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
                val: getState('endMonth') + '月',
                class: [headerMonthClass],
                update: {method: updateHeader, name: 'rightMe'}
            },
            {
                name: 'svg',
                val: 'right',
                event: increaseEndMonth,
                style: 'right:30px',
                update: {method: updateHeader, name: 'ar'}
            },
            {name: 'svg', val: 'd-right', event: increaseEndYear, style: 'right:3px'}
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

function toSelectRight(e:_Event) {
    toSelectRangeDate(e,'right')
}


export function createRightDayBody(): (HTMLElement | Element) {
    return createPageBody<dpKey>(
        42, toSelectRight, dayBodyClass, updateDP, 'rightBody')
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