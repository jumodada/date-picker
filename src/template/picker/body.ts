import {createNode} from "../../utils/dom-utils/element"
import {createNodeArguments} from "../../types/methods"
import {getDP, updateDP} from "../../store"
import {getLastMonthHasDays, getMonthHasDays, whatDayIsMonthFirstDay} from "../../utils/date";
import nexttick from "../../utils/nexttick";


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
        const totalDays = firstDay+days
        const surplusDays = 42-totalDays
        if (childrenNodes && childrenNodes.length === 42) {
            for(let l=1;l<=firstDay;l++){
                (childrenNodes[firstDay - l] as any).innerText = lastMonthDays-l+1
            }
            for (let t = 0; t < days; t++) {
                (childrenNodes[firstDay + t] as any).innerText = t + 1
            }
            for(let s=0;s<surplusDays;s++){
                (childrenNodes[totalDays + s] as any).innerText = s + 1
            }
        }else{
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

