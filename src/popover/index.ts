import Store from "../store"
import flexOptions from "../types/options"
import {positionAttr, _spm} from "../types/popover"
import nextTick from '../utils/nexttick'
export function createPopover() {
    const _pop = document.createElement('div')
    Store._updatePop(_pop)
}


export function updatePopover(el:HTMLElement,value:boolean):void {
    if(value){
        setPosition(el)
        el.style.display = 'block'
    }else{
        el.style.display = 'none'
    }
}

export function setPosition(el:HTMLElement) {
    const reference = Store._getReference()
    let {top, left, height, width} = reference.getBoundingClientRect()
    let _tTop, _rTop, _tLeft, _rLeft
    _tTop = top + window.scrollY
    _rTop = top + height + window.scrollY+3
    _tLeft = left + window.scrollX
    _rLeft = left + width + window.scrollX
    const placement = (Store._getOptions() as flexOptions).placement.split('-')[0]
    const position = {
        top: {top: _tTop, left: _tLeft},
        left: {top: _tTop, left: _tLeft},
        bottom: {top: _rTop, left: _rLeft},
        right: {top: _tTop, left: _rLeft}
    }
    Array.from(['left', 'top'])
        .forEach(attr => el.style[attr as any] =
            position[placement as _spm]
                [attr as positionAttr] + 'px')
    nextTick(()=>{
        let contentHeight = el.clientHeight
        let transform = {
            top: `translate(0,-100%)`,
            left: `translate(-100%,0)`,
            bottom: `translate(-${width}px,0)`,
            right: `translate(0,0)`,
        }
        el.style.transform = transform[placement as _spm]
    })
    nextTick(()=>{
        console.log('第二个')
    })
}