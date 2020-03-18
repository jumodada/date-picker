import flexOptions from '../types/options'
import {mergeOptions} from "../methods/merge"
import {_validateOptions} from "../validator/options"
import {isInputElement} from "../validator/input-element"
import {findInputElement} from "../methods/dom-utils/find-input-element"
import Store from '../store'
export default class Flex {
    defaults: flexOptions

    constructor(initialOptions: flexOptions) {
        this.defaults = initialOptions
    }

    create(el: HTMLInputElement, options: flexOptions) {
        if (options && !_validateOptions(options)) return

        let _inputElement = findInputElement(el)
        if (!isInputElement(_inputElement as any)) return

        Store._updateReference(_inputElement)
        ;(options as any) = mergeOptions<flexOptions>(this.defaults, options)
        Store._updateOptions(options)

    }

}
