import {placement, type} from "../types/options"

class InitOptions{
    placement:placement
    type:type
    zIndex:number
    constructor() {
        this.placement = 'bottom'
        this.type = 'date'
        this.zIndex = 2000
    }
}


export default InitOptions