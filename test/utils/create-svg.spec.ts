import createSVG from "../../src/utils/create-svg"


describe('utils:create-svg', () => {
    test('returns expected is a svg', () => {
        const svg = createSVG('F')
        const use = svg.childNodes[0]
        expect(svg.nodeName.toLowerCase()).toBe('svg')
        expect(use.nodeName.toLowerCase()).toBe('use')
    })
})