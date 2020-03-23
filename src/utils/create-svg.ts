export default function createSVG(name:string,size?:number):Element {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
    if(!size)size =20
    svg.setAttribute('style',`width:${size}px`)
    const use = document.createElementNS('http://www.w3.org/2000/svg','use')
    use.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',`#icon-${name}`)
    svg.appendChild(use)
    return svg
}