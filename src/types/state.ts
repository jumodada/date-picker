import flexOptions from "./options"
export interface Rect {
    width:number
    height:number
    left:number
    top:number
}
export type rectKey = 'width'|'height'|'left'|'top'

export interface stateValue {
    reference:HTMLElement
    popover:HTMLElement
    options:flexOptions
    visible:boolean
    rect:Rect
    year:number
    month:number
    pageIdx:number
    header:{
        al:HTMLElement
        ye:HTMLElement
        me:HTMLElement
        ar:HTMLElement
    }
    dayPage:{
        header:any
        body:any
    }

}
export type State = stateValue[]

