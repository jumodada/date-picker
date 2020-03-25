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
    event?:(e:Event)=>any,
    class?:string
    style?:string
    update?:{
        name?:string,
        method:(val:any,key:any)=>any
    },
    children?:createNodeArguments[]
}

export interface watchHandleKeys {
    reference:(value:any)=>any
    popover:(value:any)=>any
    options:(value:any)=>any
    visible:(value:any)=>any
    rect:(value:any)=>any
    month:(value:any)=>any
    ye:(value:any)=>any
    me:(value:any)=>any
    year:(value:any)=>any
    arrowLeft:(value:any)=>any
    arrowRight:(value:any)=>any
    pageIdx:(value:any)=>any
}

export type watchHandleKey =
    'reference'|
    'popover'|
    'options'|
    'visible'|
    'rect'|
    'year'|
    'ye'|
    'month'|
    'me'|
    'arrowLeft'|
    'arrowRight'|
    'pageIdx'