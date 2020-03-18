export type placement =
    'top'|'top-start'|'top-end'|
    'left'|'left-start'|'left-end'|
    'bottom'|'bottom-start'|'bottom-end'|
    'right'|'right-start'|'right-end'

export type trigger = 'click'|'hover'

export interface flexOptions {
    placement:placement
    trigger:trigger
    format?:string
    offset?:number,
    zIndex?:number
}

export default flexOptions