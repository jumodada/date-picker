import {isArray} from "../type-of";

export function createEL(tagName?: string): Element {
    if (!tagName) tagName = 'div'
    return document.createElement(tagName)
}

export function appendChild(children:Element|Element[],parent?:Element):void{
    if(!parent) parent = document.body
    if(isArray(children)){
        (children as []).forEach(child=>{
            (parent as Element).appendChild(child)
        })
    }else{
        parent.appendChild(children as Element)
    }
}

export function isHTMLElement(el: any): boolean {
    return el ? el instanceof window.HTMLElement : false
}