

export function isHTMLElement(el:any):boolean {
    return el instanceof (window as any)
}