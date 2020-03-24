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
    ye:HTMLElement|null
    month:number
    me:HTMLElement|null
    arrowLeft:HTMLElement|null
    arrowRight:HTMLElement|null
    pageIdx:number

}
export type State = stateValue[]

