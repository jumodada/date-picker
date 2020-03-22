import {isHTMLElement} from "../utils/dom-utils/element"
import {eventName} from "../types/event"

export function on(el:any,eventName:eventName,handler:(e:Event)=>any) {
    if(isHTMLElement(el)&&el.addEventListener){
    el.addEventListener(eventName,handler)
    }
}

export function remove(el:any,eventName:eventName,handler:(e:Event)=>any) {
    if(isHTMLElement(el)&&el.removeEventListener){
        el.removeEventListener(eventName,handler)
    }
}