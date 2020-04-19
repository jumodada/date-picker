import flexOptions from '../types/options'
import {mergeOptions} from "../utils/merge"
import {validateOptions} from "../validator/options"
import {isInputElement} from "../validator/input-element"
import {findInputElement} from "../utils/dom-utils/find-input-element"
import {changeUId, getStore, pushInState, updateOptions, updateState} from '../store'
import clickOutside from "../utils/clickoutside"
export default class Flex {
    defaults: flexOptions
    static el:any
    constructor(initialOptions: flexOptions) {
        this.defaults = initialOptions
    }
    static create(el: HTMLInputElement, options: flexOptions) {
        if (options && !validateOptions(options)) return
        let _inputElement = findInputElement(el)
        if (!isInputElement(_inputElement as any)) return
        pushInState()
        options = mergeOptions<flexOptions>((this as any).defaults, options)
        updateOptions(options)
        this.el = _inputElement
        updateState(_inputElement,'reference')
        return this
    }
    unbind() {
        let store = getStore()
        let idx = store.findIndex(s=>s.reference===(this as any).el)
        if(store[idx].popover){
            document.body.removeChild(store[idx].popover)
        }
        ;(store[idx].reference as any) =
            (store[idx].popover as any)  = null
        ;(store as any)[idx] = {}
        let isEmpty = store.every(s=>Object.keys(s).length===0)
        if(isEmpty){
            store.length = 0
            document.body.removeEventListener('click',clickOutside)
        }
    }

    on(eventName:string,callback:(...arg:any)=>any){
        if(eventName==='change'){
            changeUId((this as any).el)
            updateState(callback,'dateChange')
        }
    }

}
