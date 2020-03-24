import InitOptions from "../../initial-options"
import {getFullYear} from "../../utils/date"
import flexOptions from "../../types/options"

export default class InitState {
    reference:null|HTMLElement
    popover:null|HTMLElement
    options:flexOptions
    visible:boolean
    rect:{x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0}
    year:number
    ye:null|HTMLElement
    constructor() {
        this.reference = null
        this.popover = null
        this.options = new InitOptions()
        this.visible = false
        this.rect = {x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0}
        this.year = getFullYear()
        this.ye = null
    }
}