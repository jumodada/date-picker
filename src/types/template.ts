export interface Header {
    ar:HTMLElement|null
    al:HTMLElement|null
    ye:HTMLElement|null
    me:HTMLElement|null
}

export interface DayPage {
    header:HTMLElement|null
    body:(HTMLElement)
}

export type headerKey = 'ar'|'al'|'ye'|'me'
export type dpKey = 'header'|'body'
