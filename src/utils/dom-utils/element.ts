import {isArray} from "../type-of";
import {createNodeArguments} from "../../types/methods"
import createSVG from "../create-svg"
import {on} from "../../event/eventListener"

export function createEL(tagName?: string): HTMLElement {
    if (!tagName) tagName = 'div'
    return document.createElement(tagName)
}

export function createNode(node: createNodeArguments): (Element | HTMLElement) {
    if (node.el) return node.el
    const el = node.name === 'svg' ? createSVG(node.val) : createEL(node.name)
    if (node.name !== 'svg') {
        if (node.val) {
            (el as HTMLElement).innerText = node.val
        }
    }
    if (node.event) on(el, 'click', node.event)
    if (node.class) el.setAttribute('class', node.class)
    if (node.style) el.setAttribute('style', node.style)
    if (node.update) node.update.method(el, node.update.name)
    if (node.children) {
        node.children.forEach(child => {
            let childNode = createNode(child)
            el.appendChild(childNode)
        })
    }

    return el
}

export function appendChild(children: Element | Element[], parent?: Element): void {
    if (!parent) parent = document.body
    if (isArray(children)) {
        ;(children as []).forEach(child => {
            (parent as Element).appendChild(child)
        })
    } else {
        parent.appendChild(children as Element)
    }
}

export function addAttr(el: HTMLElement, val: string, name?: string) {
    if (!name) name = 'class'
    let attrVal = el.getAttribute(name)
    if (attrVal) {
        if(attrVal.indexOf(val)===-1){
            val += ' ' + attrVal
            el.setAttribute(name, val)
        }
    }else{
        el.setAttribute(name, val)
    }
}

export function removeAttr(el: HTMLElement, val: string, name?: string) {
    if (!name) name = 'class'
    let attrVal:string | null = el.getAttribute(name)
    if (attrVal && attrVal.indexOf(val) > -1) {
        attrVal = attrVal.split(' ').filter(c=>c!==val&&c).join(' ')
        el.setAttribute(name, attrVal)
    }
}