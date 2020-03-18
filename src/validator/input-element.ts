import {getNodeName} from "../methods/dom-utils/node"


export function isInputElement($el:HTMLInputElement):boolean {
   return getNodeName($el)==='input'
}