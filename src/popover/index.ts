import Store from "../store"

export function createPopover() {
    const _pop = document.createElement('div')
    Store._updatePop(_pop)
}

export function updatePopover(el:HTMLElement,value:boolean):void {
    el.style.display = value?'block':'none'
}