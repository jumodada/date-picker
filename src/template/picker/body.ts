import {createNode, addAttr, removeClass} from "../../utils/dom-utils/element"
import {createNodeArguments} from "../../types/methods"
import { getDP, getMonth, getYear, updateDate, updateDP} from "../../store"
import {getLastMonthHasDays, getMonthHasDays, getSelectDate, joinDate, whatDayIsMonthFirstDay} from "../../utils/date";
import nexttick from "../../utils/nexttick"
import {_Event} from "../../types/event"
import {selectedClass} from "../../utils/class-name";


export function createDayHeader(): (HTMLElement | Element) {
    const childrenNodes: createNodeArguments[] = []
    const names = ['日', '一', '二', '三', '四', '五', '六']
    names.forEach(name => {
        let node: createNodeArguments = {name: 'li', val: name}
        childrenNodes.push(node)
    })
    return createNode({
        name: 'ul',
        class: 'fl-dateTimePicker-body-day-header',
        update: {method: updateDP, name: 'header'},
        children: childrenNodes
    })
}

export function toSelectDate(e: _Event): void {
    let {innerText, dataset} = e.target
    let view = dataset.view
    let [year, month] = [getYear(), getMonth()]
    if (view === 'pre' && --month === 0) {
        year--
    } else if (view === 'next' && ++month === 13) {
        year++
    }
    innerText = joinDate<number, string>(year, month, innerText)
    updateDate(innerText)
}

export function createDayBody(): (HTMLElement | Element) {
    const childrenNodes: createNodeArguments[] = []
    Array.from({length: 42}).forEach(() => {
        let node: createNodeArguments = {name: 'li', event: toSelectDate}
        childrenNodes.push(node)
    })
    return createNode({
        name: 'ul',
        class: 'fl-dateTimePicker-body-day-body',
        update: {method: updateDP, name: 'body'},
        children: childrenNodes
    })
}

export function renderDate() {
    nexttick(() => {
        let firstDay = whatDayIsMonthFirstDay()
        if (firstDay === 0) firstDay = 7
        const days = getMonthHasDays()
        const lastMonthDays = getLastMonthHasDays()
        const childrenNodes = getDP().body?.childNodes
        const totalDays = firstDay + days
        const selectDay = getSelectDate()
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
                if(innerText===selectDay&&!view){
                    addAttr(node, selectedClass)
                }else{
                    removeClass(node,selectedClass)
                }
                node.innerText = innerText.toString()
                addAttr(node, `fl-dateTimePicker${isFade ? '-not' : ''}-this-month`)
                addAttr(node, view, 'data-view')
            }
        } else {
            console.error('renderDate error ')
        }
    })

}

export function createDayPage() {
    return createNode({
        name: 'div',
        class: 'fl-dateTimePicker-body',
        children: [
            {el: createDayHeader()},
            {el: createDayBody()},
        ]
    })
}

