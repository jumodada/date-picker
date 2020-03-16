import Flex from './core/flex-picker'
import {flexOptions} from "./types/options"
import {flexInstance} from "./types/instance"
import {extend} from "./methods/extend"
import initialOptions from './initial-options'
function createInstance(config: flexOptions): flexInstance {
    const context = new Flex(config)
    const instance = Flex.prototype.create.bind(context)
    extend(instance, context)
    return instance as flexInstance
}
const flex = createInstance(initialOptions)


export default flex