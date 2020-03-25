export interface types {
    Date:string,
    Object: string,
    Array: string,
    String: string,
    Number: string
}

export interface createChildrenArguments {
    name:'svg'|'span'|'div'|'ul'|'li',
    val:any,
    event?:(e:Event)=>any,
    class?:string
    style?:string
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