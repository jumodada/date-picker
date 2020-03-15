import {getNodeName} from "../methods/dom-utils/node";
import {findInputElement} from "../methods/dom-utils/find-input-element";


export function isInputElement($el:HTMLInputElement):boolean {
    let node = findInputElement($el)
    if(!node){
        console.error('Invalid argument provided. They must be a DOM element')
        return
    }

    return false
}