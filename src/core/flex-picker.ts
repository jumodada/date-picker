import flexOptions from '../types/options'

export default class flex{
    defaults:flexOptions
    constructor(initialOptions:flexOptions) {
        this.defaults = initialOptions
    }
    create(el:HTMLInputElement,options:flexOptions){
        el.addEventListener('click',(e)=>{
            console.log(1)
        })
    }
}
