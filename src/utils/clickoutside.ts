import {closePopover, getPop, getReference, getVisible} from "../store"

export default function clickOutside(e: Event) {
    const visible = getVisible()
    if(!visible)return
    const reference = getReference()
    const popover = getPop()
    if (reference.contains(e.target)
     || popover.contains(e.target)) return
    closePopover()
}