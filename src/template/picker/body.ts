import {createNode} from "../../utils/dom-utils/element"
import {createNodeArguments} from "../../types/methods";
import {updateDP} from "../../store";


export function createDayHeader():(HTMLElement|Element) {
    const childrenNodes:createNodeArguments[] = []
    const names = ['日','一','二','三','四','五','六']
    names.forEach(name=>{
        let node:createNodeArguments = {name:'li',val:name}
        childrenNodes.push(node)
    })
    return createNode({
        name:'ul',
        class:'fl-dateTimePicker-body-day-header',
        update:{method:updateDP,name:'header'},
        children:childrenNodes
    })
}

export function createDayBody():(HTMLElement|Element) {
    const childrenNodes:createNodeArguments[] = []
    Array.from({length:42}).forEach((_u,index)=>{
        let node:createNodeArguments = {name:'li',val:index+1}
        childrenNodes.push(node)
    })
    return createNode({
        name:'ul',
        class:'fl-dateTimePicker-body-day-body',
        update:{method:updateDP,name:'body'},
        children:childrenNodes
    })
}

export function createDayPage() {
    return createNode({
        name:'div',
        class:'fl-dateTimePicker-body',
        children:[
            {el:createDayHeader()},
            {el:createDayBody()},
        ]
    })
}

