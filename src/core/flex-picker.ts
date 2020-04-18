import flexOptions from '../types/options'
import {mergeOptions} from "../utils/merge"
import {validateOptions} from "../validator/options"
import {isInputElement} from "../validator/input-element"
import {findInputElement} from "../utils/dom-utils/find-input-element"
import {getStore, pushInState, updateOptions, updateState} from '../store'
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
        // @ts-ignore
        options = mergeOptions<flexOptions>(this.defaults, options)
        updateOptions(options)
        this.el = _inputElement
        updateState(_inputElement,'reference')
        return this
    }
    unbind() {
        let store = getStore()
        // @ts-ignore
        let idx = store.findIndex(s=>s.reference===this.el)
        // @ts-ignore
        if(store[idx].popover){
            document.body.removeChild(store[idx].popover)
        }
        ;(store[idx].reference as any)  = null
        ;(store[idx].popover as any)  = null
        store.splice(idx,1)
        if(store.length===0){
            document.body.removeEventListener('click',clickOutside)
        }

    }

}
