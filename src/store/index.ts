const Store = (function () {
    const state = {
        referenceNode:null,
        visible:false
    }
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
    return {
        _getReference,
        _updateReference,
        _closePopover,
        _togglePopover,
        _openPopover
    }
})()

export default Store