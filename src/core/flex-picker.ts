import flexOptions from '../types/options'
import {mergeOptions} from "../utils/merge"
import {_validateOptions} from "../validator/options"
import {isInputElement} from "../validator/input-element"
import {findInputElement} from "../utils/dom-utils/find-input-element"
import { pushInState, updateOptions, updateReference} from '../store'
export default class Flex {
    defaults: flexOptions

    constructor(initialOptions: flexOptions) {
        this.defaults = initialOptions
    }

    create(el: HTMLInputElement, options: flexOptions) {
        if (options && !_validateOptions(options)) return

        let _inputElement = findInputElement(el)
        if (!isInputElement(_inputElement as any)) return
        pushInState()
        updateReference(_inputElement)
        ;(options as any) = mergeOptions<flexOptions>(this.defaults, options)
        updateOptions(options)

    }

}
