import {_Event, eventType} from "./event"
import {StateValue} from "./state"

export interface Types {
    Date:string
    Object: string
    Array: string
    String: string
    Number: string
    Function: string
}

export type eventHandler  = (e: _Event) => any

export interface createEventListener {
    name:eventType,
    event:eventHandler
}

export interface CreateNodeArguments<T=HTMLElement|Element,U=(e:_Event)=>any>{
    name?:'svg'|'span'|'div'|'ul'|'li'
    el?:(()=>T)|T
    val?:any
    event?:U|({name:eventType,event:U}[])
    class?:string[]
    style?:string
    update?:{
        name?:string,
        method:(val:any,key:any)=>any
    }
    children?:CreateNodeArguments[]
    initial?:'hidden'
}

export type watchHandleKey =
    'reference'
    |'popover'
    |'options'
    |'visible'
    |'year'
    |'month'
    |'pageIdx'

export interface WatchHandleKeys<T=(value:any,state:StateValue)=>any> {
    reference:T
    popover:T
    options:T
    visible:T
    month:T
    year:T
    pageIdx:T
    date:T
    endMonth:T
    endYear:T
    endDate:T
    selectRange:T
    selectStatus:T
}

export interface NodeOptions<T=(el:HTMLElement,node:CreateNodeArguments)=>any> {
    event:T
    class:T
    style:T
    update:T
    children:T
    name:()=>void
    val:T,
    initial:T
}
export type nodeKey =
    'event'|
    'class'|
    'style'|
    'update'|
    'children'|
    'name'|
    'val'|
    'initial'

export interface SelectDayType {
    date:(...arg:any[])=>number[]
    'date-range':(year:number,month:number)=>number[]
}
