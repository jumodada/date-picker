

const callbacks: any[] = []
let pending = false
let timerFunc:any
function flushCallbacks () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    console.log(copies.length)
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

timerFunc = ()=>setTimeout(flushCallbacks, 0)

export default function nextTick(cb:any) {
    callbacks.push(() => {
        if (cb) {
            cb.call()
        }
    })
    if (!pending) {
        pending = true
        timerFunc()
    }
}