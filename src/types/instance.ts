import flexOptions from "./options"


export interface flex {
    defaults:flexOptions
    create(el: HTMLElement,options:flexOptions): void
}


export interface flexInstance extends flex{
    create(el: HTMLElement,options:flexOptions): void
}
