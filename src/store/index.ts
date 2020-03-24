import {mergeOptions} from "../utils/merge"
import initState from "./watcher"
import {Rect, State, stateValue} from "../types/state"
import {isNumber} from "../utils/type-of"

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

    function _getOptions(): object {
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

    function _getVisible(): boolean {
        return state[uid].visible
    }

    function _getYear(): number | null {
        return state[uid].year
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

    function _getYe(): HTMLElement | null {
        return state[uid].ye
    }

    function _updateYE(val: HTMLElement) {
        state[uid].ye = val
    }
    function _getPage():number {
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
        _updateYear,
        _plusYear,
        _getYe,
        _updateYE,
        _pageTurning,
        _getPage
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
export const updateYear = Store._updateYear
export const plusYear = Store._plusYear
export const getYe = Store._getYe
export const updateYE = Store._updateYE
export const pageTurning = Store._pageTurning
export const getPage:()=>number = Store._getPage
