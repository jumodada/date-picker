import state from './state'
import handler from './handler'
export default function initState():object {
    return new Proxy(state, handler)
}