import {closePopover, getPop, getReference} from "../store"

export default function clickOutside(e: any) {
    const reference = getReference()
    const popover = getPop()
    if (reference.contains(e.target)
     || popover.contains(e.target)) return
    closePopover()
}