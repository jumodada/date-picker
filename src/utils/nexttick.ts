
import {isIE} from "./env"

const callbacks: any[] = []
let pending = false
let timerFunc:any
function flushCallbacks () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

timerFunc = ()=>{
    console.log('nn')
    setTimeout(flushCallbacks, 0)
}

export default function nextTick(cb:any) {
    console.log(isIE)
    setTimeout(()=>{
        cb()
    }, 0)
}