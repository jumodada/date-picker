import {watchHandleKeys} from "../../../types/methods"
import {
    watchReference,watchPopover,
    watchOptions,watchVisible,
    watchRect,watchYear,watchMonth,
    watchPageIdx
} from "./methods"

const keys:watchHandleKeys= {
    reference:watchReference,
    popover:watchPopover,
    options:watchOptions,
    visible:watchVisible,
    rect:watchRect,
    year:watchYear,
    month:watchMonth,
    pageIdx:watchPageIdx
}
export default {
    get(target: any, key: string, receiver: any) {
        return Reflect.get(target, key, receiver)
    },
    set(target: any, key: string, value: any, receiver: any) {
        keys[key](value)

        return Reflect.set(target, key, value, receiver)
    }
}