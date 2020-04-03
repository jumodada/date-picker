export type placement =
    'top'
    |'left'
    |'bottom'
    |'right'

export type type = 'date'|'date-range'

export interface flexOptions {
    placement:placement
    type:type
    format?:string
    offset?:number,
    zIndex?:number
}

export default flexOptions