export type placement =
    'top'|'top-start'|'top-end'|
    'left'|'left-start'|'left-end'|
    'bottom'|'bottom-start'|'bottom-end'|
    'right'|'right-start'|'right-end'


export interface flexOptions {
    placement?:placement
    format?:string
    offset?:number
}

export default flexOptions