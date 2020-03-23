import InitOptions from "../../initial-options"
import {getFullYear} from "../../utils/date"

export default {
    reference:null,
    popover:null,
    options:new InitOptions(),
    visible:false,
    rect:{x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0},
    year:getFullYear(),
    ye:null

}