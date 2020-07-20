import {getState} from "../store"
import FlexOptions from "../types/options"
import {addAttr} from "../utils/dom-utils/element"


export function setPopoverStyle(el: HTMLElement): void {
    const style = `position:absolute;z-index:${(getState('options') as FlexOptions).zIndex};`
    addAttr(el,style,'style')
}
