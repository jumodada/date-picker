export type placement =
    'top'
    |'left'
    |'bottom'
    |'right'

export type type = 'date'|'date-range'

export interface FlexOptions {
    placement:placement|placement[]
    type?:type|type[]
    unlinkPanels?:boolean|boolean[]
    offset?:number
    zIndex?:number
    format?:string
}
export interface FlexOptionsForType {
    format:(val:any)=>boolean
}

export default FlexOptions

export type formatKey = 'dd'|'d'|'yyyy'|'yy'|'M'|'MM'