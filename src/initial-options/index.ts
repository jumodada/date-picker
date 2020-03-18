import {placement, trigger} from "../types/options"

class InitOptions{
    placement:placement
    trigger:trigger
    zIndex:number
    constructor() {
        this.placement = 'bottom-start'
        this.trigger = 'click'
        this.zIndex = 2000
    }
}


export default InitOptions