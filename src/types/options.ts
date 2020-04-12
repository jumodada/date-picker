export type placement =
    'top'
    |'left'
    |'bottom'
    |'right'

export type type = ('date'|'date-range')[]

export interface flexOptions {
    placement:placement|placement[]
    type:type|type[]
    unlinkPanels:boolean[]
    format?:string
    offset?:number
    zIndex?:number
}

export default flexOptions