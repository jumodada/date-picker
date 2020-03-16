import {isHTMLElement} from "../methods/dom-utils/element";

export function $on(el:HTMLElement,eventName:string,handler:()=>{}) {
    if(isHTMLElement(el)&&el.addEventListener){

    }
}