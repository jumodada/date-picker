export default function createSVG(name:string):Element {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
    const use = document.createElementNS('http://www.w3.org/2000/svg','use')
    use.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',`#icon-${name}`)
    svg.appendChild(use)
    return svg
}