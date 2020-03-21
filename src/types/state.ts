import flexOptions from "./options"
export interface Rect {
    width:number
    height:number
    left:number
    top:number
}
export type rectKey = 'width'|'height'|'left'|'top'
export interface State {
    reference:HTMLElement
    popover:HTMLElement
    options:flexOptions
    visible:boolean
    rect:Rect
}

