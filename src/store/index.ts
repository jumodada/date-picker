import {mergeOptions} from "../utils/merge"
import initState from "./watcher"
import {State, stateKey, StateValue} from "../types/state"
import {isNumber} from "../utils/type-of"
import {dpKey, headerKey, opKey} from "../types/template"
import {renderDate, renderMonth, renderYear} from "../template/picker/body"
import {equalDate} from "../utils/date"

const Store = (function () {
    let uid = 0
    let state = [] as State
    function _toggleToLastUId() {
        uid = state.length - 1
    }

    function getStore() {
        return state
    }

    function _changeUId(e: Event|HTMLElement) {
        let el = (e as any).target||e
        state = state.filter((s,idx)=>Object.keys(s).length>0)
        uid = state.findIndex(s =>(s.reference as any) === el)
    }

    function _pushInState() {
        state.push(initState() as StateValue)
        _toggleToLastUId()
    }

    function _updateOptions(_o: object): void {
        state[uid].options = mergeOptions(state[uid].options, _o)
        console.log(state[uid].options)
    }

    function _getState(key: stateKey): any {
        return state[uid][key]
    }

    function _updateState(val: any, key: stateKey): void {
        (state[uid][key] as any) = val
    }

    function _closeAllButHasId() {
        state.forEach((s, idx) => {
            if (idx !== uid && s.popover) {
                s.visible = false
            }
        })
    }

    function _openPopover(e: Event): void {
        _changeUId(e)
        _closeAllButHasId()
        if (state[uid].visible) return
        state[uid].visible = true
    }


    function _updateDate(val: string, key: 'date' | 'endDate' = 'date'): void {
        let date: Date
        if (val.toString().length < 3) {
            const year = getState('year')
            const month = getState('month')
            date = new Date(year + '/' + month + '/' + val)
        } else {
            date = new Date(val)
        }
        if (equalDate(state[uid][key], date)) return
        state[uid][key] = date
    }

    function _plusYear(val: number, key?: 'endYear' | 'year') {
        if (!key) key = 'year'
        if (isNumber(state[uid].year)) {
            (state[uid][key] as number) += val
        } else {
            state[uid][key] = val
        }
    }


    function _plusMonth(val: number, key?: 'endMonth' | 'month'): void {
        if (!key) key = 'month'
        let month = state[uid][key]
        month += val
        if (month > 12 || month < 1) {
            let year = Math.floor(month / 12)
            if (year === 0) year = -1
            month = month > 12 ? (month % 12) : ((month % 12) + 12)
            _plusYear(year, key === 'endMonth' ? 'endYear' : 'year')
        }
        state[uid][key] = month
    }


    function _updateHeader(val: any, key: headerKey) {
        state[uid].header[key] = val
    }

    function _updateDP(val: any, key: dpKey) {
        state[uid].dayPage[key] = val
        if (key === 'body') {
            renderDate()
        } else if (key === 'rightBody') {
            renderDate('right')
        }
    }

    function _updateOP(val: any, key: opKey) {
        state[uid].otherPage[key] = val
        if (key === 'month') {
            renderMonth()
        } else if (key === 'year') {
            renderYear()
        }
    }

    return {
        _changeUId,
        getStore,
        _getState,
        _pushInState,
        _openPopover,
        _updateOptions,
        _plusYear,
        _updateHeader,
        _plusMonth,
        _updateDP,
        _updateOP,
        _updateDate,
        _updateState,
    }
})()

export const changeUId = Store._changeUId
export const getStore = Store.getStore
export const getState = Store._getState
export const pushInState = Store._pushInState
export const openPopover = Store._openPopover
export const updateOptions = Store._updateOptions
export const plusYear = Store._plusYear
export const plusMonth = Store._plusMonth
export const updateHeader = Store._updateHeader
export const updateDP = Store._updateDP
export const updateOP = Store._updateOP
export const updateDate = Store._updateDate
export const updateState = Store._updateState

