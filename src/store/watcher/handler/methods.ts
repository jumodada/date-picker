import {openPopover} from "../../index"
import {on, remove} from "../../../event/eventListener"
import clickOutside from "../../../utils/clickoutside"
import {isElementExist} from "../../../utils/dom-utils/is-element-exist"
import {createPopover, updatePopover} from "../../../template"
import {appendChild} from "../../../utils/dom-utils/element"
import {setPopoverStyle} from "../../../template/style"
import {renderDate, renderYear} from "../../../template/picker/body"
import {getBackMonth, getNextMonth} from "../../../utils/date"
import nexttick from "../../../utils/nexttick"
import {stateValue} from "../../../types/state"

export function watchOptions() {
// todo
}

export function watchRect() {
// todo
}

export function watchDate(value: Date,state:stateValue) {
    state.year = value.getFullYear()
    state.month = value.getMonth() + 1
    renderDate()
}

export function watchReference(ref: HTMLElement,state:stateValue) {
    const preElement = state.reference
    remove(preElement, 'click', openPopover)
    remove(document.body, 'click', clickOutside)
    if (ref) {
        on(ref, 'click', openPopover)
        on(document.body, 'click', clickOutside)
    }
}

export function watchVisible(value: boolean,state:stateValue) {
    const _p = state.popover
    const _exist = isElementExist(_p)
    if (!_exist) {
        createPopover()
        updatePopover(state.popover, value)
    } else {
        updatePopover(_p, value)
    }
}

export function elementShow(elements: any[], isHidden: boolean) {
    const display = isHidden ? 'none' : ''
    elements.forEach(arg => {
        arg.forEach((_a: { style: { display: string } }) => _a.style.display = display)
    })
}

export function watchPageIdx(value: number,state:stateValue) {
    const {ye, me, ar, al} = state.header
    const {header, body} = state.dayPage
    const {month, year} = state.otherPage
    const yearVal = state.year
    let period = (yearVal as number) + 9
    const date = [me, al, ar, header, body]
    const $elements = [date, [month], [year]]
    if (!ye) return
    if (value === 2) {
        ye.innerText = yearVal + ' - ' + period
    }
    elementShow($elements.splice(value, 1), false)
    elementShow($elements, true)
}

export function watchPopover(value: HTMLElement,state:stateValue) {
    if (value) {
        const _prePop = state.popover
        if (!isElementExist(_prePop)) {
            appendChild(value)
            setPopoverStyle(value)
        }

    }
}

export function watchYear(value: number,state:stateValue): void {
    const page = state.pageIdx
    const {ye} = state.header
    if (ye) {
        ye.innerText = value.toString() + '年'
    }
    if (state.year === value) return
    if (page === 2) {
        renderYear()
    } else if (page === 0) {
        renderDate()
    }
    nexttick(()=>state.endYear = value)
}

export function watchEndYear(value:number,state:stateValue):void {
    if (state.endYear === value) return
    const {rightYe} = state.header
    if (rightYe) {
        rightYe.innerText = value.toString() + '年'
    }
    nexttick(()=>state.year = value)
}

const monthMethods = {
    date: (value: number,state:stateValue) => {
        // do nothing
    },
    'date-range': (value: number,state:stateValue) => {
        state.endMonth = getNextMonth(value)
    }
}

export function watchMonth(value: number,state:stateValue): void {
    if (state.month === value) return
    const {me} = state.header
    const {type} = state.options
    me.innerText = value.toString() + '月'
    nexttick(()=>monthMethods[type as 'date'](value,state))
    renderDate()
}

export function watchEndMonth(value:number,state:stateValue):void {
    if (state.endMonth === value) return
    const {rightMe} = state.header
    rightMe.innerText = value.toString() + '月'
    nexttick(()=>state.month=getBackMonth(value))

}