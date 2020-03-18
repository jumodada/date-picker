import Store from "../store"
import flexOptions from "../types/options"


export function setStyle(el: HTMLElement): void {
    const style = `position:absolute;z-index:${(Store._getOptions() as flexOptions).zIndex};`
    el.setAttribute('style', style)
}