import flexOptions from '../types/options'
import {mergeOptions} from "../methods/merge"
import {checkOptions} from "../check/check-options"
import {isInputElement} from "../check/check-input-element"
import {findInputElement} from "../methods/dom-utils/find-input-element"
import Store from '../store'
export default class Flex {
    defaults: flexOptions

    constructor(initialOptions: flexOptions) {
        this.defaults = initialOptions
    }

    create(el: HTMLInputElement, options: flexOptions) {
        if (options && !checkOptions(options)) return

        let _inputElement = findInputElement(el)
        if (!isInputElement(_inputElement as any)) return

        Store._updateReference(_inputElement)
        ;(options as any) = mergeOptions<flexOptions>(this.defaults, options)
        Store._updateOptions(options)

    }

}
