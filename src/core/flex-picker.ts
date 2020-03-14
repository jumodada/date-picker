import flexOptions from '../types/options'
import {mergeOptions} from "../methods/merge"

export default class flex{
    defaults:flexOptions
    constructor(initialOptions:flexOptions) {
        this.defaults = initialOptions
    }
    create(el:HTMLInputElement,options:flexOptions){

        mergeOptions<flexOptions>(this.defaults,options)
        // el.addEventListener('click',(e)=>{
        //     console.log(1)
        // })
    }
}
