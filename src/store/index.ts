import {mergeOptions} from "../methods/merge"
import initState from "./watcher"

const Store = (function () {
    const state = initState() as any
    function _getReference():any{
        return state.referenceNode
    }
    function _updateReference(val:any):void{
        state.referenceNode = val
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
        _closePopover,
        _togglePopover,
        _openPopover,
        _updateOptions,
        _updateKeyInOptions,
        _getOptions

    }
})()

export default Store