import {getState, updateState} from "../store"

export default function clickOutside(e: Event) {
    const visible = getState('visible')
    if(!visible)return
    const reference = getState('reference')
    const popover = getState('popover')
    if (reference.contains(e.target)
     || popover.contains(e.target)) return
    updateState(false,'visible')
}