import {getState, openPopover, updateState} from "../../index"
import {on, remove} from "../../../event/eventListener"
import clickOutside from "../../../utils/clickoutside"
import {isElementExist} from "../../../utils/dom-utils/is-element-exist"
import {createPopover, updatePopover} from "../../../template"
import {appendChild} from "../../../utils/dom-utils/element"
import {setPopoverStyle} from "../../../template/style"
import {renderDate, renderYear} from "../../../template/picker/body"
import {
    getBackMonth,
    getBackYear,
    getRightDate,
    getNextMonth,
    getNextYear,
    getLeftDate
} from "../../../utils/date"
import nexttick from "../../../utils/nexttick"
import {StateValue} from "../../../types/state"

export function watchOptions() {
// todo
}

export function watchRect() {
// todo
}

export function watchDate(value: Date, state: StateValue) {
    let {type} = getState('options')
    if(type==='date-range'&&
        (getRightDate()<value||value<getLeftDate())
    )return
    updateState(value.getFullYear(), 'year')
    updateState(value.getMonth() + 1, 'month')
    renderDate()
}

export function watchEndDate(value: Date, state: StateValue) {

    renderDate('right')
}
export function watchReference(ref: HTMLElement, state: StateValue) {
    const preElement = state.reference
    remove(preElement, 'click', openPopover)
    remove(document.body, 'click', clickOutside)
    if (ref) {
        on(ref, 'click', openPopover)
        on(document.body, 'click', clickOutside)
    }
}

export function watchVisible(value: boolean, state: StateValue) {
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

export function watchPageIdx(value: number, state: StateValue) {
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

export function watchPopover(value: HTMLElement, state: StateValue) {
    if (value) {
        const _prePop = state.popover
        if (!isElementExist(_prePop)) {
            appendChild(value)
            setPopoverStyle(value)
        }

    }
}

export function watchYear(value: number, state: StateValue): void {
    const page = state.pageIdx
    const {ye} = state.header
    const {type} = state.options
    if (ye) {
        ye.innerText = value.toString() + '年'
    }
    if (state.year === value) return
    if (page === 2) {
        renderYear()
    } else if (page === 0) {
        renderDate()
    }
    if(type==='date-range'){
        nexttick(() => updateState(getNextYear(value, state.month), 'endYear'))
    }
}

export function watchEndYear(value: number, state: StateValue): void {
    if (state.endYear === value) return
    const {rightYe} = state.header
    if (rightYe) {
        rightYe.innerText = value.toString() + '年'
    }

    renderDate('right')
    nexttick(() => updateState(getBackYear(value, state.endMonth), 'year'))
}

const monthMethods = {
    date: (...arg: any) => {
        // do nothing
    },
    'date-range': (value: number, state: StateValue) => {
        updateState(getNextMonth(value), 'endMonth')
        updateState(getNextYear(state.year, value), 'endYear')
    }
}

export function watchMonth(value: number, state: StateValue): void {
    if (state.month === value) return
    const {me} = state.header
    const {type} = state.options
    me.innerText = value.toString() + '月'
    nexttick(() => monthMethods[type as unknown as 'date'](value, state))
    renderDate()
}

export function watchEndMonth(value: number, state: StateValue): void {
    if (state.endMonth === value) return
    const {rightMe} = state.header
    rightMe.innerText = value.toString() + '月'
    renderDate('right')
    nexttick(() => {
        updateState(getBackMonth(value), 'month')
        updateState(getBackYear(state.endYear, value), 'year')
    })

}