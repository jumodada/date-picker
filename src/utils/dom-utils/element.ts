import {isArray} from "../type-of";
import {createChildrenArguments} from "../../types/methods"
import createSVG from "../create-svg"

export function createEL(tagName?: string): HTMLElement {
    if (!tagName) tagName = 'div'
    return document.createElement(tagName)
}

export function createChildren(children:createChildrenArguments[]):Element[] {
    const childrenLists:Element[] = []
    children.forEach(child=>{
        if(child.name==='svg'){
            childrenLists.push(createSVG(child.val))
        }else{
            const el = createEL(child.name)
            if(child.val)el.innerText = child.val
            childrenLists.push(el)
        }
    })
    return childrenLists
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


export function setAttr(el:HTMLElement,val:string,name?:string) {
    if(!name)name='class'
    el.setAttribute(name,val)
}