import Flex from './core/flex-picker'
import {FlexOptions} from "./types/options"
import {flexInstance} from "./types/instance"
import {extend} from "./utils/extend"
import InitOptions from "./initial-options"
import './svg'

function createInstance(config: FlexOptions): (el:HTMLElement,options:FlexOptions) => flexInstance {
    return (el:HTMLElement,options:FlexOptions)=>{
        const context = new Flex(config)
        // @ts-ignore
        const instance = Flex.create.apply(context,arguments)
        extend(context,instance)
        return instance as unknown as flexInstance       
    }
}
const flex = createInstance(new InitOptions() as FlexOptions)
export default flex