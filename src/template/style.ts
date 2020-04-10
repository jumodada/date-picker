import {getState} from "../store"
import flexOptions from "../types/options"
import {addAttr} from "../utils/dom-utils/element"


export function setPopoverStyle(el: HTMLElement): void {
    const style = `position:absolute;z-index:${(getState('options') as flexOptions).zIndex};`
    addAttr(el,style,'style')
}