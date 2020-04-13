import {watchHandleKey, watchHandleKeys} from "../../../types/methods"
import {
    watchReference, watchPopover,
    watchOptions, watchVisible,
    watchRect, watchYear, watchMonth,
    watchPageIdx, watchDate, watchEndMonth, watchEndYear, watchEndDate
} from "./methods"
const keys:watchHandleKeys= {
    reference:watchReference,
    popover:watchPopover,
    options:watchOptions,
    visible:watchVisible,
    rect:watchRect,
    year:watchYear,
    date:watchDate,
    month:watchMonth,
    pageIdx:watchPageIdx,
    endMonth:watchEndMonth,
    endYear:watchEndYear,
    endDate:watchEndDate
}
export default {
    get(target: any, key: watchHandleKey, receiver: any) {
        return Reflect.get(target, key, receiver)
    },
    set(target: any, key: watchHandleKey, value: any, receiver: any) {
        keys[key](value,target)
        return Reflect.set(target, key, value, receiver)
    }
}