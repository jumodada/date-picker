import {getState, updateState} from "../store"
import {positionAttr, _spm} from "../types/popover"
import nextTick from '../utils/nexttick'
import {Rect, rectKey} from "../types/state"
import {createNode} from "../utils/dom-utils/element"
import {createHeader} from "./picker/header"
import {createBody} from "./picker/body"
import {datepickerClass, dateRangePickerClass} from "../utils/class-name"
import {createLeft} from "./picker/left"
import {createRight} from "./picker/right"

const transform = {
    top: `translate(0,-100%)`,
    left: `translate(-100%,0)`,
    bottom: `translate(0,0)`,
    right: `translate(0,0)`
}
let popoverByType: any


nextTick(() => {
    const updatePop = (arg:any)=>updateState(arg,'popover')
    popoverByType = {
        date: {
            children: [{el: createHeader}, {el: createBody}],
            class:[datepickerClass],
            update: {method: updatePop}
        },
        'date-range':{
            children: [{el: createLeft}, {el: createRight}],
            class: [dateRangePickerClass,datepickerClass],
            update: {method: updatePop}
        }
    }
})

export function createPopover() {
    const {type} = getState('options')
    return createNode(popoverByType[type as 'date'])
}

export function updatePopover(el: HTMLElement, value: boolean): void {
    if (value) {
        setPopoverLocation(el)
        el.style.display = 'block'
    } else {
        el.style.display = 'none'
    }
}

export function setPopoverLocation(el: HTMLElement) {
    const placement = (getState('options') as any).placement.split('-')[0] as _spm
    const reference = getState('reference')
    let rect = reference.getBoundingClientRect()
    if (diffRect(rect)) return
    updateState(rect,'rect')
    setPosition(el, placement, rect)
    setTransform(el, placement)
}

export function setTransform(el: HTMLElement, placement: any) {
    nextTick(() => el.style.transform = transform[placement as _spm])
}

export function setPosition(el: HTMLElement, placement: _spm, rect: Rect) {
    const position = getPosition(rect)
    Array.from(['left', 'top'])
        .forEach(attr => el.style[attr as any] =
            position[placement as _spm][attr as positionAttr] + 'px')
}

export function diffRect(curRect: Rect) {
    let preRect = getState('rect')
    return Array.from(['width,left', 'top', 'height'])
        .every(key => preRect[key as rectKey] === curRect[key as rectKey])
}

export function getPosition({top, left, height, width}: Rect) {
    const _tTop = top + window.scrollY
    const _bTop = top + height + window.scrollY + 7
    const _tLeft = left + window.scrollX
    const _rLeft = left + width + window.scrollX
    return {
        top: {top: _tTop, left: _tLeft},
        left: {top: _tTop, left: _tLeft},
        bottom: {top: _bTop, left: _rLeft - width},
        right: {top: _tTop, left: _rLeft}
    }
}


export function dispatchChange() {
   nextTick(()=>{
       const {type} = getState('options')
       let onChange = getState('dateChange')
       let [startDate,endDate] = [getState('date'),getState('endDate')]
       let date = type==='date-range'?[startDate,endDate]:startDate
       if(onChange){
           onChange(date)
       }
   })
}