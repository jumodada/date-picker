import flexOptions from '../types/options'
import {mergeOptions} from "../methods/merge"
import {checkOptions} from "../check/check-options";

export default class flex {
    defaults: flexOptions

    constructor(initialOptions: flexOptions) {
        this.defaults = initialOptions
    }

    create(el: HTMLInputElement, options: flexOptions) {
        if(options&&!checkOptions(options))return
        (options as any) = mergeOptions<flexOptions>(this.defaults, options)
        console.log(options)
        // el.addEventListener('click',(e)=>{
        //     console.log(1)
        // })
    }
}
