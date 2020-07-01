import flexOptions from '../types/options'
import {mergeOptions} from "../utils/merge"
import {validateOptions} from "../validator/options"
import {isInputElement} from "../validator/input-element"
import {findInputElement} from "../utils/dom-utils/find-input-element"
import {changeUId, getSP, getState, getStore, pushInState, updateOptions, updateSP, updateState} from '../store'
import clickOutside from "../utils/clickoutside"
import {getAllScrollParents} from "../utils/window"
import {setPopoverLocation} from "../template"
import {isArray} from "../utils/type-of"
import {getRealMonth} from "../utils/date"

const listenToScrollParents = (el:HTMLElement) => {
    let scrollParents = getAllScrollParents(el)
    scrollParents.forEach((el:any)=>{
        if(!el)return
        el.addEventListener('scroll',setPopoverLocation)
        updateSP(el)
    })
    window.addEventListener('resize', setPopoverLocation as any)
}
const removeListenerOnSP = () => {
    getSP().forEach(el=>{
        el.removeEventListener('scroll',setPopoverLocation)
    })
    let store = getStore()
    store.forEach(s=> {
        if(!s.reference)return
        listenToScrollParents(s.reference)
    })
    if(store.length===0){
        window.removeEventListener('resize',setPopoverLocation as any)
    }
}

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
        listenToScrollParents(this.el)
        updateState(_inputElement,'reference')
        return this
    }
    unbind() {
        let store = getStore()
        let idx = store.findIndex(s=>s.reference===(this as any).el)
        if(idx===-1)return console.warn('Input Element is not exists')
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
        removeListenerOnSP()
    }

    on(eventName:string,callback:(...arg:any)=>any){
        if(eventName==='change'){
            changeUId((this as any).el)
            updateState(callback,'dateChange')
        }
    }

    getDate():any{
        changeUId((this as any).el)
        const {type} = getState('options')
        if(type==='date')return getState('date')
        if(type==='date-range')return [getState('date'),getState('endDate')]
    }
    getYear(){
        let date = this.getDate()
        let isArr = isArray(date)
        if(!date||(isArr&&!date[0]))return date
        if(isArr){
            return date.map((d:any)=>d.getFullYear())
        }else{
            return date.getFullYear()
        }
    }
    getMonth(){
        let date = this.getDate()
        let isArr = isArray(date)
        if(!date||(isArr&&!date[0]))return date
        if(isArr){
            return date.map((d:any)=>getRealMonth(d))
        }else{
            return getRealMonth(date)
        }
    }

    

}
