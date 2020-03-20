import {isHTMLElement} from "../utils/dom-utils/element"
import {eventName} from "../types/event"

export function on(el:HTMLElement,eventName:eventName,handler:()=>{}) {
    if(isHTMLElement(el)&&el.addEventListener){
    el.addEventListener(eventName,handler)
    }
}

export function remove(el:HTMLElement,eventName:eventName,handler:()=>{}) {
    if(isHTMLElement(el)&&el.removeEventListener){
        el.removeEventListener(eventName,handler)
    }
}