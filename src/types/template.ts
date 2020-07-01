export interface HeaderNode<T =HTMLElement|null> {
    ar:T
    al:T
    ye:T
    me:T
    rightYe:T
    rightMe:T
}

export interface DayNode<T=HTMLElement> {
    header:T
    body:T
    rightHeader:T,
    rightBody:T
}

export interface RenderDateType {
    right:{
        month:'endMonth',
        year:'endYear',
        el:'rightBody'
    },
    left:{
        month:'month',
        year:'year',
        el:'body'
    }
}

export interface RangeDateKey {
    date:{
        year:'year',
        month:'month'
    },
    endDate:{
        year:'endYear',
        month:'endMonth'
    }
}

export type RenderDateTypeKey = 'left'|'right'

export interface YmNode<T=HTMLElement> {
    month:T
    year:T
}

export type headerKey = 'ar'|'al'|'ye'|'me'|'rightYe'|'rightMe'
export type dpKey = 'header'|'body'|'rightHeader'|'rightBody'
export type opKey = 'month'|'year'
