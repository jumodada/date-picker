export default function createSVG(name:string,size?:number):Element {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
    if(!size)size =15
    let style= `width:${size}px;height:${size}px;`
    if(name==='right'){
        style+= 'margin-left:auto;'
    }else if(name==='left'){
        style+= 'margin-right:auto'
    }
    svg.setAttribute('style',style)
    const use = document.createElementNS('http://www.w3.org/2000/svg','use')
    use.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',`#icon-${name}`)
    svg.appendChild(use)
    return svg
}