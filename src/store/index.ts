import {mergeOptions} from "../utils/merge"
import initState from "./watcher"
import {Rect, State} from "../types/state"

const Store = (function () {
    const state = initState() as State
    function _getReference():any{
        return state.reference
    }
    function _updateReference(val:any):void{
        state.reference = val
    }
    function _getRect() {
        return state.rect
    }
    function _updateRect(rect:Rect) {
        state.rect = rect
    }
    function _getPop():any{
        return state.popover
    }
    function _updatePop(val:any):void{
        state.popover = val
    }
    function _closePopover():void {
        state.visible = false
    }
    function _togglePopover():void {
        state.visible = !state.visible
    }
    function _openPopover():void {
        state.visible = true
    }
    function _updateOptions(_o:object):void {
        state.options = mergeOptions(state.options,_o)
    }
    function _updateKeyInOptions(key:string,val:any) {
        if(typeof val==='undefined')return
        const _o = Object.create(null)
        _o[key] = val
        state.options = mergeOptions(state.options,_o)
    }
    function _getOptions():object {
      return mergeOptions(state.options)
    }
    return {
        _getReference,
        _updateReference,
        _getRect,
        _updateRect,
        _closePopover,
        _togglePopover,
        _openPopover,
        _updateOptions,
        _updateKeyInOptions,
        _getOptions,
        _getPop,
        _updatePop
    }
})()

export const  getReference = Store._getReference
export const  updateReference = Store._updateReference
export const  getRect = Store._getRect
export const  updateRect = Store._updateRect
export const  closePopover = Store._closePopover
export const  togglePopover = Store._togglePopover
export const  openPopover = Store._openPopover
export const  updateOptions = Store._updateOptions
export const  updateKeyInOptions = Store._updateKeyInOptions
export const  getOptions = Store._getOptions
export const  getPop = Store._getPop
export const  updatePop = Store._updatePop

export default Store