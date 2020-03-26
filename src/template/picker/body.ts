import {createNode, setAttr} from "../../utils/dom-utils/element"
import {createNodeArguments} from "../../types/methods"
import {getDP, updateDP} from "../../store"
import {getLastMonthHasDays, getMonthHasDays, whatDayIsMonthFirstDay} from "../../utils/date";
import nexttick from "../../utils/nexttick"


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

export function toSelectDate(e: Event): void {
    console.log(e)
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
        if (childrenNodes && childrenNodes.length === 42) {
            for(let i=1;i<43;i++){
                const node = childrenNodes[i-1] as any
                let innerText = 0
                const isFade = i<=firstDay||i>totalDays
                innerText = i <= firstDay 
                    ? lastMonthDays - firstDay + i
                    : innerText = i > totalDays
                        ? i - totalDays : i - firstDay
                node.innerText = innerText.toString()
                setAttr(node, `fl-dateTimePicker-${isFade?'not':''}-this-month`)
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

