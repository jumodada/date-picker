import FlexOptions from "./options"
export interface Rect {
    width:number
    height:number
    left:number
    top:number
}

export type stateKey  =
    'reference'|'popover'
    |'options'|'visible' |'year'
    |'month'|'endYear'
    |'endMonth'|'endDate'
    |'date'|'pageIdx'
    |'header'|'dayPage'
    |'otherPage'|'selectRange'
    |'selectStatus'|'dateChange'

export interface StateValue {
    reference:HTMLElement
    popover:HTMLElement
    options:FlexOptions
    visible:boolean
    selectStatus:'none'|'done'|'selecting'
    year:number
    month:number
    endYear:number
    endMonth:number
    endDate:Date
    date:Date
    pageIdx:number
    selectRange:string[]|[]
    header:{
        al:HTMLElement
        ye:HTMLElement
        me:HTMLElement
        ar:HTMLElement
        rightYe:HTMLElement
        rightMe:HTMLElement
    }
    dayPage:{
        header:any
        body:any
        rightHeader:any
        rightBody:any
    }
    otherPage:{
        year:any
        month:any
    }
    selecting:'none'|'done'|'selecting'
    dateChange:any
}
export type State = StateValue[]

