import {getOptions, getPop, getReference, openPopover} from '../index'
import {remove, on} from "../../event/eventListener"
import flexOptions from "../../types/options"
import {createPopover, updatePopover} from "../../popover"
import {isElementExist} from "./is-element-exist"
import {setPopoverStyle} from "../../popover/style"
import clickOutside from "../../utils/clickoutside"

function showPopper(): void {
    openPopover()
}

function watchReference(ref: HTMLElement) {
    const preElement = getReference()
    const {trigger} = getOptions() as flexOptions

    remove(preElement, (trigger as any), showPopper)
    remove(document.body,'click', clickOutside)
    if(ref){
        on(ref, (trigger as any), showPopper)
        on(document.body, 'click', clickOutside)
    }
}

function watchVisible(value: boolean) {
    const _p = getPop()
    const _exist = isElementExist(_p)
    if (!_exist) {
        createPopover()
        updatePopover(getPop(), value)
    } else {
        updatePopover(_p, value)
    }
}

function watchPopover(value: HTMLElement) {
    if (value) {
        const _prePop = getPop()
        if (!isElementExist(_prePop)) {
            document.body.appendChild(value)
            setPopoverStyle(value)
        }

    }
}

export default {
    get(target: any, key: string, receiver: any) {
        return Reflect.get(target, key, receiver)
    },
    set(target: any, key: string, value: any, receiver: any) {
        if (key === 'reference') watchReference(value)
        if (key === 'visible') watchVisible(value)
        if (key === 'popover') watchPopover(value)
        return Reflect.set(target, key, value, receiver)
    }
}