export interface Header<T =HTMLElement|null> {
    ar:T
    al:T
    ye:T
    me:T
    rightYe:T
    rightMe:T
}

export interface DayPage<T=HTMLElement> {
    header:T
    body:T
    rightHeader:T,
    rightBody:T
}

export interface RenderDateType {
    right:{
        month:'endMonth',
        year:'endYear',
        date:'endDate',
        el:'rightBody'
    },
    left:{
        month:'month',
        year:'year',
        date:'date',
        el:'body'
    }
}

export type RenderDateTypeKey = 'left'|'right'

export interface OtherPage<T=HTMLElement> {
    month:T
    year:T
}

export type headerKey = 'ar'|'al'|'ye'|'me'|'rightYe'|'rightMe'
export type dpKey = 'header'|'body'|'rightHeader'|'rightBody'
export type opKey = 'month'|'year'
