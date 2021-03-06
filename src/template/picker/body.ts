import {
    createNode,
    resetAttr,
    updateReferenceInDate, removeClasses, toggleClass
} from "../../utils/dom-utils/element"
import {CreateEventListener, CreateNodeArguments, eventHandler} from "../../types/methods"
import {
    getState,
    updateDate,
    updateDP,
    updateOP,
    updateState
} from "../../store"
import {
    compareDate, dateParse,
    getLastMonthHasDays, getRangeDate,
    getSelectDay,
    joinDate, monthHasDays,
    whatDayIsMonthFirstDay
} from "../../utils/date"
import nexttick from "../../utils/nexttick"
import {_Event} from "../../types/event"
import {
    datepickerBodyClass,
    dayBodyClass, dayClass, dayHeaderClass, disabledClass, endDateClass, inRangeClass,
    monthBodyClass,
    notThisMonth,
    selectedClass, startDateClass,
    yearBodyClass
} from "../../utils/class-name"
import {dpKey, opKey, RangeDateKey, RenderDateType, RenderDateTypeKey} from "../../types/template"
import {dayName, monthName} from "../../i18n/zh-CN"
import {dispatchChange} from "../index"


export function createDayHeader(): (HTMLElement | Element) {
    const childrenNodes: CreateNodeArguments[] = []
    dayName.forEach(name => {
        let node: CreateNodeArguments = {name: 'li', val: name}
        childrenNodes.push(node)
    })
    return createNode({
        name: 'ul',
        class: [dayHeaderClass],
        update: {method: updateDP, name: 'header'},
        children: childrenNodes,
    })
}

const rangeDateKey: RangeDateKey = {
    date: {
        year: 'year',
        month: 'month'
    },
    endDate: {
        year: 'endYear',
        month: 'endMonth'
    }
}

export function handleSelectDate(e: _Event, key: 'date' | 'endDate' = 'date') {
    let {innerText, dataset} = e.target
    let view = dataset.view
    let [year, month] = [getState(rangeDateKey[key].year), getState(rangeDateKey[key].month)]
    if (view === 'pre' && --month === 0) {
        year--
        month = 12
    } else if (view === 'next' && ++month === 13) {
        year++
        month = 1
    }
    return joinDate<number, string>(year, month, innerText)
}


export function toSelectDate(e: _Event): void {
    if ((e.target as any).$flexDisabled) return
    if((e.target as any).nodeName.toLowerCase()!=='li')return
    let innerText = handleSelectDate(e)
    updateReferenceInDate(new Date(innerText))
    updateDate(innerText)
    dispatchChange()
}

export function toSelectMonth(e: _Event): void {
    let parentNode = getState('ymNode').month
    let {target} = e
    let selectIMonth = Array.from(parentNode.childNodes).findIndex(child => (child as any) === target) + 1
    updateState(selectIMonth, 'month')
    updateState(0, 'pageIdx')
}

export function toSelectYear(e: _Event): void {
    let parentNode = getState('ymNode').year
    let {target} = e
    let selectIYear = (Array.from(parentNode.childNodes).find(child => (child as any) === target) as HTMLElement).innerText
    updateState(Number(selectIYear), 'year')
    updateState(1, 'pageIdx')
}

export function createPageBody<T>(
    length: number,
    ulListener: eventHandler | CreateEventListener[],
    liListener: CreateEventListener[] | null,
    classes: string,
    update: (val: any, key: T) => any,
    updateName: string,
    initial?: 'hidden'
): (HTMLElement | Element) {
    const children: CreateNodeArguments[] = []
    Array.from({length}).forEach(() => {
        let node: CreateNodeArguments = {name: 'li'}
        if (liListener) node.event = liListener
        children.push(node)
    })
    return createNode({
        name: 'ul',
        event: ulListener,
        class: [classes],
        update: {method: update, name: updateName},
        children,
        initial
    })
}

export function createDayBody(eventHandler: eventHandler, liListener: any, updateName: string): (HTMLElement | Element) {
    return createPageBody<dpKey>(
        42, eventHandler, liListener, dayBodyClass, updateDP, updateName)
}

export function createMonthBody(): (HTMLElement | Element) {
    return createPageBody<opKey>(
        12, toSelectMonth, null, monthBodyClass, updateOP, 'month', 'hidden')
}

export function createYearBody(): (HTMLElement | Element) {
    return createPageBody<opKey>(
        10, toSelectYear, null, yearBodyClass, updateOP, 'year', 'hidden')
}

const dateType: RenderDateType = {
    right: {
        month: 'endMonth',
        year: 'endYear',
        el: 'rightBody'
    },
    left: {
        month: 'month',
        year: 'year',
        el: 'body'
    }
}

function getViewDate(year: number, month: number, day: number, view: string) {
    if (view === 'pre' && --month === 0) {
        month = 12
        year--
    } else if (view === 'next' && ++month === 13) {
        month = 1
        year++
    }
    return year + '/' + month + '/' + day
}

export function renderDate(type: RenderDateTypeKey = 'left') {
    const callback = () => {
        // tslint:disable-next-line:one-variable-per-declaration
        let month, year, el
        month = getState(dateType[type].month)
        year = getState(dateType[type].year)
        el = dateType[type].el
        let firstDay = whatDayIsMonthFirstDay(year, month)
        if (firstDay === 0) firstDay = 7
        const days = monthHasDays(year, month)
        const lastMonthDays: number = getLastMonthHasDays(year, month)
        const childrenNodes = getState('dayNode')[el as any].childNodes
        const totalDays = firstDay + days
        const selectDay = getSelectDay(year, month)
        let [startDate, endDate] = [getRangeDate()[0], getRangeDate()[1]]
        if (childrenNodes && childrenNodes.length === 42) {
            for (let i = 1; i < 43; i++) {
                const node = childrenNodes[i - 1] as any
                let [view, innerText] = ['', 0]
                const isFade = i <= firstDay || i > totalDays
                if (i <= firstDay) {
                    view = 'pre'
                    innerText = lastMonthDays - firstDay + i
                } else if (i > totalDays) {
                    view = 'next'
                    innerText = i - totalDays
                } else {
                    innerText = i - firstDay
                }
                let viewDate = getViewDate(year, month, innerText, view)
                if (!view) {
                    const parseViewDate = dateParse(viewDate)
                    toggleClass(node, selectedClass, selectDay.indexOf(innerText) > -1)
                    toggleClass(node, inRangeClass, compareDate(viewDate, startDate) && compareDate(endDate, viewDate))
                    toggleClass(node, startDateClass, parseViewDate === dateParse(startDate))
                    toggleClass(node, endDateClass, parseViewDate === dateParse(endDate))
                } else {
                    removeClasses(node,[selectedClass,inRangeClass,startDateClass,endDateClass])
                }
                handleDisabled(node, viewDate)
                toggleClass(node, notThisMonth, isFade)
                resetAttr(node, view, 'data-view')
                let intStr = innerText.toString()
                if (node.innerText === intStr) continue
                node.innerText = intStr
            }
        } else {
            console.error('renderDate error ')
        }
    }
    callback.$FLEXPCIKERTYPE = 'render-date' + type
    nexttick(callback)
}

function handleDisabled(node: HTMLElement, date: string) {
    const {disabled} = getState('options')
    if (disabled) {
        const isDisabled = disabled(new Date(date))
        ;(node as any).$flexDisabled = isDisabled
        toggleClass(node, disabledClass, isDisabled)
    }
}


export function renderMonth() {
    nexttick(() => {
        let childrenNodes = getState('ymNode').month.childNodes
        childrenNodes.forEach((node: HTMLElement, index: any) => {
            (node as HTMLElement).innerText = monthName[index].toString()
        })
    })
}

export function renderYear() {
    nexttick(() => {
        let childrenNodes = getState('ymNode').year.childNodes
        const year = getState('year')
        childrenNodes.forEach((node: HTMLElement, index: any) => {
            (node as HTMLElement).innerText = (year + index).toString()
        })
    })
}

export function createDay(eventHandler: eventHandler, liListener: any, updateName: string) {
    return createNode({
        class: [dayClass],
        children: [
            {el: createDayHeader},
            {el: createDayBody(eventHandler, liListener, updateName)},
        ]
    })
}

export function createBody() {
    return createNode({
        class: [datepickerBodyClass],
        children: [
            {el: createDay(toSelectDate, null, 'body')},
            {el: createMonthBody},
            {el: createYearBody},
        ]
    })
}

