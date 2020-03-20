import Flex from './core/flex-picker'
import {flexOptions} from "./types/options"
import {flexInstance} from "./types/instance"
import {extend} from "./utils/extend"
import Store from '../src/store'
function createInstance(config: flexOptions): flexInstance {
    const context = new Flex(config)
    const instance = Flex.prototype.create.bind(context)
    extend(instance, context)
    return instance
}
const flex = createInstance(Store._getOptions() as flexOptions)


export default flex