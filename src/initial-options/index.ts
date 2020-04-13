import {placement, type} from "../types/options"

class InitOptionsByDate{
    placement:placement
    type:type
    zIndex:number
    unlinkPanels:boolean
    constructor() {
        this.placement = 'bottom'
        this.type = 'date'
        this.zIndex = 2000
        this.unlinkPanels = false
    }
}



export default InitOptionsByDate