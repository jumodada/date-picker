export type placement =
    'top'
    |'left'
    |'bottom'
    |'right'

export type type = 'date'|'date-range'

export interface FlexOptions {
    placement:placement|placement[]
    type:type|type[]
    unlinkPanels:boolean|boolean[]
    format?:string
    offset?:number
    zIndex?:number
}

export default FlexOptions

export type formatKey = 'dd'|'d'|'yyyy'|'yy'|'M'|'MM'