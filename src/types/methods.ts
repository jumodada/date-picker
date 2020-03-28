import {_Event} from "./event"

export interface types {
    Date:string,
    Object: string,
    Array: string,
    String: string,
    Number: string
}

export interface createNodeArguments {
    name?:'svg'|'span'|'div'|'ul'|'li',
    el?:HTMLElement|Element
    val?:any,
    event?:(e:_Event)=>any,
    class?:string
    style?:string
    update?:{
        name?:string,
        method:(val:any,key:any)=>any
    },
    children?:createNodeArguments[]
}

export type watchHandleKey =
    'reference'
    |'popover'
    |'options'
    |'visible'
    |'rect'
    |'year'
    |'month'
    |'pageIdx'

export interface watchHandleKeys<T=(value:any)=>any> {
    reference:T
    popover:T
    options:T
    visible:T
    rect:T
    month:T
    year:T
    pageIdx:T
    date:T
}

export interface NodeOptions<T=(el:HTMLElement,node:createNodeArguments)=>any> {
    event:T
    class:T
    style:T
    update:T
    children:T
    name:()=>void
    val:T
}
export type nodeKey =
    'event'|
    'class'|
    'style'|
    'update'|
    'children'|
    'name'|
    'val'