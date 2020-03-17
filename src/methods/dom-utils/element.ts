export function isHTMLElement(el:any):boolean {
    return el?el instanceof window.HTMLElement:false
}