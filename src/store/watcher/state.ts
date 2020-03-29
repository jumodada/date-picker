import InitOptions from "../../initial-options"
import {getFullYear,getRealMonth} from "../../utils/date"
import flexOptions from "../../types/options"

export default class InitState {
    reference:null|HTMLElement
    popover:null|HTMLElement
    options:flexOptions
    visible:boolean
    rect:{x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0}
    year:number
    header:{
        ye:any
        me:any
        al:any
        ar:any
    }
    dayPage:{
       header:any
       body:any
    }
    otherPage:{
        year:any
        month:any
    }
    month:number
    date:Date
    pageIdx:number

    constructor() {
        this.reference = null
        this.popover = null
        this.options = new InitOptions()
        this.visible = false
        this.rect = {x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0}
        this.year = getFullYear()
        this.month = getRealMonth()
        this.date = new Date()
        this.header ={
            ye:null,
            me:null,
            al:null,
            ar:null
        }
        this.dayPage= {
            header:null,
            body:null
        }
        this.otherPage = {
            month:null,
            year:null
        }
        this.pageIdx = 0
    }
}