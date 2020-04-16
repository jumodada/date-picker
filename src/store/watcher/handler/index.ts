import {watchHandleKey, WatchHandleKeys} from "../../../types/methods"
import {
    watchReference, watchPopover,
    watchOptions, watchVisible,
    watchYear, watchMonth,
    watchPageIdx, watchDate, watchEndMonth, watchEndYear, watchEndDate, watchSelectRange,
    watchSelectStatus
} from "./methods"
const keys:WatchHandleKeys= {
    reference:watchReference,
    popover:watchPopover,
    options:watchOptions,
    visible:watchVisible,
    year:watchYear,
    date:watchDate,
    month:watchMonth,
    pageIdx:watchPageIdx,
    endMonth:watchEndMonth,
    endYear:watchEndYear,
    endDate:watchEndDate,
    selectRange:watchSelectRange,
    selectStatus:watchSelectStatus,
}
export default {
    get(target: any, key: watchHandleKey, receiver: any) {
        return Reflect.get(target, key, receiver)
    },
    set(target: any, key: watchHandleKey, value: any, receiver: any) {
        keys[key]&&keys[key](value,target)
        return Reflect.set(target, key, value, receiver)
    }
}