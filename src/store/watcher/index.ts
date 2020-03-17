import InitOptions from "../../initial-options"

export default function initState():object {
    const state = {
        referenceNode:null,
        options:new InitOptions()
    }
    return new Proxy(state, {
        get: function (target, key, receiver) {
            return Reflect.get(target, key, receiver)
        },
        set: function (target, key, value, receiver) {
            return Reflect.set(target, key, value, receiver)
        }
    })
}