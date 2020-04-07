import {getOptions} from "../store"
import flexOptions from "../types/options"
import {addAttr} from "../utils/dom-utils/element"


export function setPopoverStyle(el: HTMLElement): void {
    const style = `position:absolute;z-index:${(getOptions() as flexOptions).zIndex};`
    addAttr(el,style,'style')
}