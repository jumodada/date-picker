import state from './state'
import handler from './handler/handler'
export default function initState():object {
    return new Proxy( new state(), handler)
}