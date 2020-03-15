import flexOptions from '../types/options'
import {mergeOptions} from "../methods/merge"
import {checkOptions} from "../check/check-options";
import {isInputElement} from "../check/check-input-element";
import {findInputElement} from "../methods/dom-utils/find-input-element";

export default class flex {
    defaults: flexOptions

    constructor(initialOptions: flexOptions) {
        this.defaults = initialOptions
    }

    create(el: HTMLInputElement, options: flexOptions) {
        if(options&&!checkOptions(options))return
        let _inputElement = findInputElement(el)
        if(isInputElement(el))return
        (options as any) = mergeOptions<flexOptions>(this.defaults, options)
        // el.addEventListener('click',(e)=>{
        //     console.log(1)
        // })
    }
}
