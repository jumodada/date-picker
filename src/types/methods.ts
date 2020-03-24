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