import {isArray} from "../type-of";
import {createChildrenArguments} from "../../types/methods"
import createSVG from "../create-svg"
import {on} from "../../event/eventListener"

export function createEL(tagName?: string): HTMLElement {
    if (!tagName) tagName = 'div'
    return document.createElement(tagName)
}

export function createChildren(node:createChildrenArguments):(Element|HTMLElement) {
    const el = node.name==='svg'?createSVG(node.val):createEL(node.name)
    if(node.name!=='svg'){
        if(node.val){
            (el as HTMLElement).innerText = node.val
        }
    }
    if(node.event){
        on(el,'click',node.event)
    }
    if(node.class){
        el.setAttribute('class',node.class)
    }
    if(node.style){
        el.setAttribute('style',node.style)
    }
    if(node.update){
        node.update.method(el,node.update.name)
    }
    if(node.children){
        node.children.forEach(child=>{
            let childNode = createChildren(child)
            el.appendChild(childNode)
        })
    }

    return el
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

export function setAttr(el:HTMLElement,val:string,name?:string) {
    if(!name)name='class'
    el.setAttribute(name,val)
}