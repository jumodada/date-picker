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
    |'headerNode'|'dayNode'
    |'ymNode'|'selectRange'
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
    headerNode:{
        al:HTMLElement
        ye:HTMLElement
        me:HTMLElement
        ar:HTMLElement
        rightYe:HTMLElement
        rightMe:HTMLElement
    }
    dayNode:{
        header:any
        body:any
        rightHeader:any
        rightBody:any
    }
    ymNode:{
        year:any
        month:any
    }
    selecting:'none'|'done'|'selecting'
    dateChange:any
}
export type State = StateValue[]

