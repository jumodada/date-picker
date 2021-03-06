import {isArray, isFunc} from "../type-of"
import {CreateNodeArguments, nodeKey, NodeOptions} from "../../types/methods"
import createSVG from "../create-svg"
import {on} from "../../event/eventListener"
import {eventType} from "../../types/event"
import {getState, updateState} from "../../store"
import {formatParse} from "../format"

const nodeOptions: NodeOptions = {
    event: (el, node) => {
        if (isArray(node.event)) {
            (node.event as any).forEach((e: { name: eventType, event: any }) => {
                on(el, e.name, e.event as any)
            })
        } else {
            on(el, 'click', node.event as any)
        }
    },
    val: (el, node) => {
        if (node.name !== 'svg') {
            ;(el as HTMLElement).innerText = node.val
        }
    },
    class: (el, node) =>
        el.setAttribute('class', (node.class as any).join(' ')),
    style: (el, node) =>
        el.setAttribute('style', node.style as any),
    update: (el, node) =>
        node.update?.method(el, node.update?.name),
    children: (el, node) => {
        node.children?.forEach(child => {
            let childNode = createNode(child)
            el.appendChild(childNode)
        })
    },
    name: () => {
        // todo
    },
    initial: (el, node) => {
        if (node.initial === 'hidden') {
            addAttr(el, 'display:none', 'style')
        }
    }
}


export function createEL(tagName?: string): HTMLElement {
    if (!tagName) tagName = 'div'
    return document.createElement(tagName)
}

export function createNode(node: CreateNodeArguments): (Element | HTMLElement) {
    if (node.el && isFunc(node.el)) return (node.el as any)()
    if (node.el) return (node.el as any)
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

export function resetAttr(el: HTMLElement, val: string, name?: string) {
    if (!name) name = 'class'
    el.setAttribute(name, val)
}

export function addAttr(el: HTMLElement, val: string, name?: string) {
    if (!name) name = 'class'
    let attr = el.getAttribute(name)
    if (attr) {
        if (attr.indexOf(val) === -1) {
            val += ' ' + attr
            el.setAttribute(name, val)
        }
    } else {
        el.setAttribute(name, val)
    }
}

function filterClasses(classes: string, val: string[]) {
    val.forEach(v => {
        classes = classes.split(' ').filter(c => c !== v && c).join(' ')
    })
    return classes
}

export function toggleClass(node: HTMLElement, className: string, isNull: boolean) {
    if (isNull) {
        addAttr(node, className)
    } else {
        removeClasses(node, [className])
    }
}

export function removeClasses(el: HTMLElement, classes: string[]) {
    let attr: string | null = el.getAttribute('class')
    classes.forEach(cls => removeClass(el, attr, cls))
}

export function removeClass(el: HTMLElement, attr: string | null, cls: string) {
    if (attr && attr.indexOf(cls) > -1) {
        attr = filterClasses(attr, [cls])
        el.setAttribute('class', attr)
    }
}

export function updateReferenceInDate(date: Date) {
    const ref = getState('reference')
    const {format} = getState('options')
    ref.value = formatParse(date, format)
    updateState(false, 'visible')
}

export function updateReferenceInDateRange(start: Date, end: Date) {
    const ref = getState('reference')
    const {format} = getState('options')
    ref.value = formatParse(start, format) + ' - ' + formatParse(end, format)
}
