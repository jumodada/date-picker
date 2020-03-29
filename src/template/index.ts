import {getOptions, getRect, getReference, updatePop, updateRect} from "../store"
import flexOptions from "../types/options"
import {positionAttr, _spm} from "../types/popover"
import nextTick from '../utils/nexttick'
import {Rect, rectKey} from "../types/state"
import {createNode} from "../utils/dom-utils/element"
import {createHeader} from "./picker/header"
import {createBody} from "./picker/body"
const  transform = {
    top: `translate(0,-100%)`,
    left: `translate(-100%,0)`,
    bottom: `translate(0,0)`,
    right: `translate(0,0)`
}


export function createPopover() {
    createNode({
        name:'div',
        children:[
            {el:createHeader()},
            {el:createBody()},
        ],
        update:{method:updatePop}
    })
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
    const placement = (getOptions() as flexOptions).placement.split('-')[0] as _spm
    const reference = getReference()
    let rect = reference.getBoundingClientRect()
    if(diffRect(rect))return
    updateRect(rect)
    setPosition(el,placement,rect)
    setTransform(el,placement)
}
export function setTransform(el:HTMLElement,placement:any){
    nextTick(() => el.style.transform = transform[placement as _spm])
}

export function setPosition(el:HTMLElement,placement:_spm,rect:Rect) {
    const position = getPosition(rect)
    Array.from(['left', 'top'])
        .forEach(attr => el.style[attr as any] =
            position[placement as _spm][attr as positionAttr] + 'px')
}

export function diffRect(curRect:Rect) {
    let preRect = getRect()
    return Array.from(['width,left','top','height'])
        .every(key=>preRect[key as rectKey]===curRect[key as rectKey])
}

export function getPosition({top,left,height,width}:Rect) {
    const _tTop = top + window.scrollY
    const _bTop = top + height + window.scrollY+7
    const _tLeft = left + window.scrollX
    const _rLeft = left + width + window.scrollX
    return {
        top: {top: _tTop, left: _tLeft},
        left: {top: _tTop, left: _tLeft},
        bottom: {top: _bTop, left: _rLeft-width},
        right: {top: _tTop, left: _rLeft}
    }
}