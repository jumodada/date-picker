import {createNode, addAttr, removeClass, resetAttr, toggleClass} from "../../utils/dom-utils/element"
import {CreateNodeArguments} from "../../types/methods"
import {
    getState,
    updateDate,
    updateDP,
    updateOP,
    updateState
} from "../../store"
import {
    getLastMonthHasDays,
    getMonthHasDays,
    getSelectDate,
    joinDate,
    whatDayIsMonthFirstDay
} from "../../utils/date"
import nexttick from "../../utils/nexttick"
import {_Event} from "../../types/event"
import {
    datepickerBodyClass,
    dayBodyClass, dayClass, dayHeaderClass,
    monthBodyClass,
    notThisMonth,
    selectedClass,
    thisMonth,
    yearBodyClass
} from "../../utils/class-name"
import {dpKey, opKey, RenderDateType, RenderDateTypeKey} from "../../types/template"
import {dayName, monthName} from "../../i18n/zh-CN"


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

export function toSelectDate(e: _Event): void {
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
    updateDate(innerText)
}

export function toSelectMonth(e: _Event): void {
    let parentNode = getState('otherPage').month
    let {target} = e
    let selectIMonth = Array.from(parentNode.childNodes).findIndex(child => (child as any) === target) + 1
    updateState(selectIMonth, 'month')
    updateState(0, 'pageIdx')
}

export function toSelectYear(e: _Event): void {
    let parentNode = getState('otherPage').year
    let {target} = e
    let selectIYear = (Array.from(parentNode.childNodes).find(child => (child as any) === target) as HTMLElement).innerText
    updateState(Number(selectIYear), 'year')
    updateState(1, 'pageIdx')
}

export function createPageBody<T>(
    amount: number,
    event: (e: _Event) => any,
    classes: string,
    update: (val: any, key: T) => any,
    updateName: string,
    initial?: 'hidden'
): (HTMLElement | Element) {
    const childrenNodes: CreateNodeArguments[] = []
    Array.from({length: amount}).forEach(() => {
        let node: CreateNodeArguments = {name: 'li', event: event}
        childrenNodes.push(node)
    })
    return createNode({
        name: 'ul',
        class: [classes],
        update: {method: update, name: updateName},
        children: childrenNodes,
        initial: initial
    })
}

export function createDayBody(eventHandler: (e: _Event) => any, updateName: string): (HTMLElement | Element) {
    return createPageBody<dpKey>(
        42, eventHandler, dayBodyClass, updateDP, updateName)
}

export function createMonthBody(): (HTMLElement | Element) {
    return createPageBody<opKey>(
        12, toSelectMonth, monthBodyClass, updateOP, 'month', 'hidden')
}

export function createYearBody(): (HTMLElement | Element) {
    return createPageBody<opKey>(
        10, toSelectYear, yearBodyClass, updateOP, 'year', 'hidden')
}

const dateType: RenderDateType = {
    right: {
        month: 'endMonth',
        year: 'endYear',
        date: 'endDate',
        el: 'rightBody'
    },
    left: {
        month: 'month',
        year: 'year',
        date: 'date',
        el: 'body'
    }
}

export function renderDate(type: RenderDateTypeKey = 'left',trigger?:string) {
    const callback = () => {
        if(getState('isSelecting')){
            console.log(1)
            updateState(false,'isSelecting')
            return
        }
        // tslint:disable-next-line:one-variable-per-declaration
        let month, year, date, el
        month = getState(dateType[type].month)
        year = getState(dateType[type].year)
        el = dateType[type].el
        date = getState(dateType[type].date)
        let firstDay = whatDayIsMonthFirstDay(year, month)
        if (firstDay === 0) firstDay = 7
        const days = getMonthHasDays(year, month)
        const lastMonthDays: number = getLastMonthHasDays(year, month)
        console.log(lastMonthDays)
        const childrenNodes = getState('dayPage')[el as any].childNodes
        const totalDays = firstDay + days
        const selectDay =getSelectDate(year, month, date)
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
                if (innerText === selectDay && !view) {
                    addAttr(node, selectedClass)
                } else {
                    removeClass(node, selectedClass)
                }
                node.innerText = innerText.toString()
                toggleClass(node, isFade ? [notThisMonth, thisMonth] : [thisMonth, notThisMonth])
                resetAttr(node, view, 'data-view')
            }
        } else {
            console.error('renderDate error ')
        }
    }
    callback.$FLEXPCIKERTYPE = 'render-date' + type
    nexttick(callback)
}

export function renderMonth() {
    nexttick(() => {
        let childrenNodes = getState('otherPage').month.childNodes
        childrenNodes.forEach((node: HTMLElement, index: any) => {
            (node as HTMLElement).innerText = monthName[index].toString()
        })
    })
}

export function renderYear() {
    nexttick(() => {
        let childrenNodes = getState('otherPage').year.childNodes
        const year = getState('year')
        childrenNodes.forEach((node: HTMLElement, index: any) => {
            (node as HTMLElement).innerText = (year + index).toString()
        })
    })
}

export function createDay(eventHandler: (e: _Event) => any, updateName: string) {
    return createNode({
        class: [dayClass],
        children: [
            {el: createDayHeader},
            {el: createDayBody(eventHandler, updateName)},
        ]
    })
}

export function createBody() {
    return createNode({
        class: [datepickerBodyClass],
        children: [
            {el: createDay(toSelectDate, 'body')},
            {el: createMonthBody},
            {el: createYearBody},
        ]
    })
}

