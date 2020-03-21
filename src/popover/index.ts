import Store from "../store"
import flexOptions from "../types/options"
import {positionAttr, _spm} from "../types/popover"
import nextTick from '../utils/nexttick'
const  transform = {
    top: `translate(0,-100%)`,
    left: `translate(-100%,0)`,
    bottom: `translate(0,0)`,
    right: `translate(0,0)`,
}

export function createPopover() {
    const _pop = document.createElement('div')
    Store._updatePop(_pop)
}
export function updatePopover(el:HTMLElement,value:boolean):void {
    if(value){
        setPopoverLocation(el)
        el.style.display = 'block'
    }else{
        el.style.display = 'none'
    }
}

export function setPopoverLocation(el:HTMLElement) {
    const placement = (Store._getOptions() as flexOptions).placement.split('-')[0] as _spm
    setPosition(el,placement)
    setTransform(el,placement)
}
export function setTransform(el:HTMLElement,placement:any){
    nextTick(() => {
        el.style.transform = transform[placement as _spm]
    })
}

export function setPosition(el:HTMLElement,placement:_spm) {
    const reference = Store._getReference()
    let {top, left, height, width} = reference.getBoundingClientRect()
    let _tTop, _bTop, _tLeft, _rLeft
    _tTop = top + window.scrollY
    _bTop = top + height + window.scrollY+3
    _tLeft = left + window.scrollX
    _rLeft = left + width + window.scrollX
    const position = {
        top: {top: _tTop, left: _tLeft},
        left: {top: _tTop, left: _tLeft},
        bottom: {top: _bTop, left: _rLeft-width},
        right: {top: _tTop, left: _rLeft}
    }
    Array.from(['left', 'top'])
        .forEach(attr => el.style[attr as any] =
            position[placement as _spm]
                [attr as positionAttr] + 'px')
}