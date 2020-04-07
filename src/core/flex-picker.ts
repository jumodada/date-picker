import flexOptions from '../types/options'
import {mergeOptions} from "../utils/merge"
import {validateOptions} from "../validator/options"
import {isInputElement} from "../validator/input-element"
import {findInputElement} from "../utils/dom-utils/find-input-element"
import { pushInState, updateOptions, updateReference} from '../store'
export default class Flex {
    defaults: flexOptions

    constructor(initialOptions: flexOptions) {
        this.defaults = initialOptions
    }

    create(el: HTMLInputElement, options: flexOptions) {
        if (options && !validateOptions(options)) return

        let _inputElement = findInputElement(el)
        if (!isInputElement(_inputElement as any)) return
        pushInState()
        updateReference(_inputElement)
        options = mergeOptions<flexOptions>(this.defaults, options)
        updateOptions(options)

    }

}
