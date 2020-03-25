import {createNode} from "../../utils/dom-utils/element"
import {createNodeArguments} from "../../types/methods";


export function createDayHeader():(HTMLElement|Element) {
    const childrenNodes:createNodeArguments[] = []
    const names = ['日','一','二','三','四','五','六']
    names.forEach(name=>{
        let node:createNodeArguments = {name:'li',val:name}
        childrenNodes.push(node)
    })
    return createNode({
        name:'div',
        class:'fl-dateTimePicker-body-day-header',
        children:childrenNodes
    })
}

export function createDayPage() {
    return createNode({
        name:'div',
        class:'fl-dateTimePicker-body',
        children:[
            {el:createDayHeader()}
        ]
    })
}

