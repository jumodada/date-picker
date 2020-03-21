// https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js
import { isIE, isNative } from './env'
/*
**在原有的vue-nextTick上面移除了对ios的兼容。
*/
const callbacks:any[] = []
let pending = false

function flushCallbacks () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

let timerFunc:()=>void

if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    timerFunc = () => {
        p.then(flushCallbacks)
    }
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
    let counter = 1
    const observer = new MutationObserver(flushCallbacks)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
        characterData: true
    })
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    }
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}

export default function nextTick (cb?: Function, ctx?: Object) {
    let _resolve:(ctx:any)=>void
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx)
            } catch (e) {
                console.error('nexttick callback error')
            }
        } else if (_resolve) {
            _resolve(ctx)
        }
    })
    if (!pending) {
        pending = true
        timerFunc()
    }
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}

export {
    nextTick
}