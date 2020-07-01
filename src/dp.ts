import Flex from './core/flex-picker'
import {FlexOptions} from "./types/options"
import {extend} from "./utils/extend"
import InitOptions from "./initial-options"
import './svg'

function createInstance(config: FlexOptions):any {
    return (el:HTMLElement,options:FlexOptions)=>{
        const context = new Flex(config)
        // @ts-ignore
        const instance = Flex.create.apply(context,arguments)
        extend(context,instance)
        return instance
    }
}
const flex = createInstance(new InitOptions())
flex.create = function create(el:HTMLElement,options:FlexOptions) {
    return Flex.create.apply(this,arguments as any)
}

flex.Flex = Flex


export default flex
