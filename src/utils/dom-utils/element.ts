import {isArray} from "../type-of";
import {createChildrenArguments} from "../../types/methods"
import createSVG from "../create-svg"
import {on} from "../../event/eventListener"

export function createEL(tagName?: string): HTMLElement {
    if (!tagName) tagName = 'div'
    return document.createElement(tagName)
}

export function createChildren(children:createChildrenArguments[]):(Element|HTMLElement)[] {
    const childrenLists:Element[] = []
    children.forEach(child=>{
        const el = child.name==='svg'?createSVG(child.val):createEL(child.name)
        if(child.name!=='svg'){
            if(child.val){
                (el as HTMLElement).innerText = child.val
            }
        }
        if(child.event){
            on(el,'click',child.event)
        }
        if(child.class){
            el.setAttribute('class',child.class)
        }
        if(child.style){
            el.setAttribute('style',child.style)
        }

        childrenLists.push(el)
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