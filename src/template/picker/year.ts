import createSVG from "../../utils/create-svg"
import {appendChild, createEL} from "../../utils/dom-utils/element"


export function createYear() {
    const wrapper = createEL()
    const drIcon = createSVG('d-right')
    const yearName = createEL('span')
    const dlIcon = createSVG('d-left')
    appendChild([dlIcon,yearName,drIcon],wrapper)
    return wrapper
}