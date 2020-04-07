import {placement, type} from "../types/options"

class InitOptionsByDate{
    placement:placement
    type:type
    zIndex:number
    constructor() {
        this.placement = 'bottom'
        this.type = 'date'
        this.zIndex = 2000
    }
}



export default InitOptionsByDate