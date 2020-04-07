import {mergeOptions} from "../utils/merge"
import initState from "./watcher"
import {Rect, State, stateValue} from "../types/state"
import {isNumber} from "../utils/type-of"
import {DayPage, dpKey, Header, headerKey, opKey, OtherPage} from "../types/template"
import {renderDate, renderMonth, renderYear} from "../template/picker/body"
import {equalDate} from "../utils/date"
import flexOptions from "../types/options"
const Store = (function () {
    let uid = 0
    const state = [] as State

    function _toggleToLastUId() {
        uid = state.length - 1
    }
    function _changeUId(e: Event) {
        uid = state.findIndex(s => (s.reference as any) === e.target)
    }

    function _pushInState() {
        state.push(initState() as stateValue)
        _toggleToLastUId()
    }

    function _updateOptions(_o: object): void {
        state[uid].options = mergeOptions(state[uid].options, _o)
    }

    function _updateKeyInOptions(key: string, val: any) {
        if (typeof val === 'undefined') return
        const _o = Object.create(null)
        _o[key] = val
        state[uid].options = mergeOptions(state[uid].options, _o)
    }

    function _getOptions(): flexOptions {
        return mergeOptions(state[uid].options)
    }

    function _getReference(): any {
        return state[uid].reference
    }

    function _updateReference(val: any): void {
        state[uid].reference = val
    }

    function _getRect() {
        return state[uid].rect
    }

    function _updateRect(rect: Rect) {
        state[uid].rect = rect
    }

    function _getPop(): any {
        return state[uid].popover
    }

    function _updatePop(val: any): void {
        state[uid].popover = val
    }

    function _closeAllButHasId() {
        state.forEach((s, idx) => {
            if (idx !== uid && s.popover) s.popover.style.display = 'none'
        })
    }

    function _closePopover(): void {
        state[uid].visible = false
    }

    function _openPopover(e: Event): void {
        _changeUId(e)
        _closeAllButHasId()
        state[uid].visible = true
    }

    function _getDate(): Date {
        return state[uid].date
    }

    function _updateDate(val: string): void {
        let date: Date
        if (val.toString().length < 3) {
            const year = getYear()
            const month = getMonth()
            date = new Date(year + '/' + month + '/' + val)
        } else {
            date = new Date(val)
        }
        if (equalDate(_getDate(),date)) return
        state[uid].date = date
    }

    function _getVisible(): boolean {
        return state[uid].visible
    }

    function _getYear(): number {
        return state[uid].year
    }
    function _getEndYear(): number {
        let month = state[uid].month
        if(++month>12){
            return state[uid].year + 1
        }else{
            return state[uid].year
        }
    }

    function _updateYear(val: number) {
        state[uid].year = val
    }

    function _plusYear(val: number) {
        if (isNumber(state[uid].year)) {
            (state[uid].year as number) += val
        } else {
            state[uid].year = val
        }
    }

    function _getMonth(): number {
        return state[uid].month
    }

    function _getEndMonth(): number {
        let month = state[uid].month
        if(++month>12){
            return 1
        }else{
            return month
        }
    }

    function _updateMonth(val: number): void {
        state[uid].month = val
    }

    function _plusMonth(val: number): void {
        let month = _getMonth()
        month += val
        if (month > 12 || month < 1) {
            let year = Math.floor(month / 12)
            if (year === 0) year = -1
            month = month > 12 ? (month % 12) : ((month % 12) + 12)
            _plusYear(year)
        }
        state[uid].month = month
    }

    function _getHeader(): Header {
        return state[uid].header
    }

    function _updateHeader(val: any, key: headerKey) {
        state[uid].header[key] = val
    }


    function _getDP(): DayPage {
        return state[uid].dayPage
    }

    function _updateDP(val: any, key: dpKey) {
        state[uid].dayPage[key] = val
        if (key === 'body') {
            renderDate()
        }
    }
    function _getOP():OtherPage {
        return state[uid].otherPage
    }
    function _updateOP(val: any, key: opKey) {
        state[uid].otherPage[key] = val
        if (key === 'month') {
            renderMonth()
        }else if(key==='year'){
            renderYear()
        }
    }
    function _getPage(): number {
        return state[uid].pageIdx
    }

    function _pageTurning(val: number) {
        state[uid].pageIdx = val
    }

    return {
        _changeUId,
        _pushInState,
        _toggleToLastUId,
        _getReference,
        _updateReference,
        _getRect,
        _updateRect,
        _closePopover,
        _openPopover,
        _closeAllButHasId,
        _updateOptions,
        _updateKeyInOptions,
        _getOptions,
        _getPop,
        _updatePop,
        _getVisible,
        _getYear,
        _getEndYear,
        _updateYear,
        _plusYear,
        _getHeader,
        _updateHeader,
        _getMonth,
        _getEndMonth,
        _updateMonth,
        _plusMonth,
        _pageTurning,
        _getPage,
        _getDP,
        _updateDP,
        _getOP,
        _updateOP,
        _getDate,
        _updateDate
    }
})()

export const toggleToLastUId = Store._toggleToLastUId
export const changeUId = Store._changeUId
export const pushInState = Store._pushInState
export const getReference = Store._getReference
export const updateReference = Store._updateReference
export const getRect = Store._getRect
export const updateRect = Store._updateRect
export const closePopover = Store._closePopover
export const closeAllButHasId = Store._closeAllButHasId
export const openPopover = Store._openPopover
export const updateOptions = Store._updateOptions
export const updateKeyInOptions = Store._updateKeyInOptions
export const getOptions = Store._getOptions
export const getPop = Store._getPop
export const updatePop = Store._updatePop
export const getVisible = Store._getVisible
export const getYear = Store._getYear
export const getEndYear = Store._getEndYear
export const updateYear = Store._updateYear
export const plusYear = Store._plusYear
export const getMonth = Store._getMonth
export const getEndMonth = Store._getEndMonth
export const updateMonth = Store._updateMonth
export const plusMonth = Store._plusMonth
export const getHeader = Store._getHeader
export const updateHeader = Store._updateHeader
export const getDP = Store._getDP
export const updateDP = Store._updateDP
export const getOP = Store._getOP
export const updateOP = Store._updateOP
export const pageTurning = Store._pageTurning
export const getDate = Store._getDate
export const updateDate = Store._updateDate
export const getPage: () => number = Store._getPage

