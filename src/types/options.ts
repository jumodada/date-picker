export type placement =
    'top'
    |'left'
    |'bottom'
    |'right'

export type type = 'date'|'date-range'

export interface FlexOptions {
    placement:placement
    type?:type
    unlinkPanels?:boolean
    offset?:number
    zIndex?:number
    format?:string
    disabled?:(date:Date)=>boolean
}

export interface FixedOptions {
    placement:placement[]
    type?:type[]
    unlinkPanels?:boolean[]
    offset?:number
    zIndex?:number
    format?:((val:any)=>boolean)
}

export default FlexOptions

export type formatKey = 'dd'|'d'|'yyyy'|'yy'|'M'|'MM'