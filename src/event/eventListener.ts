import {eventName} from "../types/event"

export function on(el:any,eventName:eventName,handler:(e:Event)=>any) {
    if(el&&el.addEventListener){
    el.addEventListener(eventName,handler)
    }
}

export function remove(el:any,eventName:eventName,handler:(e:Event)=>any) {
    if(el&&el.removeEventListener){
        el.removeEventListener(eventName,handler)
    }
}