import FlexOptions from "./options"
export interface Rect {
    width:number
    height:number
    left:number
    top:number
}
export type rectKey = 'width'|'height'|'left'|'top'

export type stateKey  =
    'reference'|'popover'
    |'options'|'visible'
    |'rect'|'year'
    |'month'|'endYear'
    |'endMonth'|'endDate'
    |'date'|'pageIdx'
    |'header'|'dayPage'
    |'otherPage'|'isSelecting'

export interface StateValue {
    reference:HTMLElement
    popover:HTMLElement
    options:FlexOptions
    isSelecting:boolean
    visible:boolean
    rect:Rect
    year:number
    month:number
    endYear:number
    endMonth:number
    endDate:Date
    date:Date
    pageIdx:number
    selectRange:(Date|null)[]
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
}
export type State = StateValue[]

