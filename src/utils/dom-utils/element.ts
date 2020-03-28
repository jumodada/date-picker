import {isArray} from "../type-of"
import {createNodeArguments, nodeKey, NodeOptions} from "../../types/methods"
import createSVG from "../create-svg"
import {on} from "../../event/eventListener"

const nodeOptions: NodeOptions = {
    event: (el, node) => on(el, 'click', node.event as any),
    val: (el, node) => {
        if (node.name !== 'svg') {
            ;(el as HTMLElement).innerText = node.val
        }
    },
    class: (el, node) => el.setAttribute('class', node.class as any),
    style: (el, node) => el.setAttribute('style', node.style as any),
    update: (el, node) => node.update?.method(el, node.update.name),
    children: (el, node) => {
        node.children?.forEach(child => {
            let childNode = createNode(child)
            el.appendChild(childNode)
        })
    },
    name: () => {
    },
}


export function createEL(tagName?: string): HTMLElement {
    if (!tagName) tagName = 'div'
    return document.createElement(tagName)
}

export function createNode(node: createNodeArguments): (Element | HTMLElement) {
    if (node.el) return node.el
    const el = node.name === 'svg' ? createSVG(node.val) : createEL(node.name)
    Object.keys(node).forEach(key => {
        nodeOptions[key as nodeKey](el as HTMLElement, node)
    })
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
        if (attrVal.indexOf(val) === -1) {
            val += ' ' + attrVal
            el.setAttribute(name, val)
        }
    } else {
        el.setAttribute(name, val)
    }
}

export function removeClass(el: HTMLElement, val: string, name?: string) {
    if (!name) name = 'class'
    let attrVal: string | null = el.getAttribute(name)
    if (attrVal && attrVal.indexOf(val) > -1) {
        attrVal = attrVal.split(' ').filter(c => c !== val && c).join(' ')
        el.setAttribute(name, attrVal)
    }
}