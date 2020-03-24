import Flex from './core/flex-picker'
import {flexOptions} from "./types/options"
import {flexInstance} from "./types/instance"
import {extend} from "./utils/extend"
import InitOptions from "./initial-options"
import './svg'
function createInstance(config: flexOptions): flexInstance {
    const context = new Flex(config)
    const instance = Flex.prototype.create.bind(context)
    extend(context,instance)
    return instance as unknown as flexInstance
}
const flex = createInstance(new InitOptions() as flexOptions)


export default flex