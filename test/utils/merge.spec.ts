import deepMerge, {mergeOptions} from "../../src/utils/merge"


describe('utils:merge', () => {
    test('deepMerge can work', () => {
        let source1 = {
            name: 'target',
            value: 1,
            children: {
                name: 't-child',
                price: 1000
            }
        }
        let source2 = {
            name: 'source',
            value: 2,
            children: {
                name: 's-child'
            },
            price: 3000
        }
        const mergeObj = deepMerge(source1, source2)
        expect(mergeObj.price).toBe(3000)
        expect(mergeObj.children.name).toBe('t-child')
        expect(mergeObj.children.price).toBe(1000)
        expect(mergeObj.name).toBe('source')
    })
    test('mergeOptions can work', () => {
        let defaultOptions = {
            placement: 'bottom',
            format: 'yyyy/mm/dd',
            unlink:false
        }
        let curOptions = {
            placement: 'top',
            format: 'yy/mm/dd',
            offset:10
        }
        const finalOption = mergeOptions(defaultOptions, curOptions as any)
        expect(finalOption.placement).toBe('top')
        expect(finalOption.format).toBe('yy/mm/dd')
        expect(finalOption.unlink).toBe(false)
        expect(finalOption.offset).toBe(10)
    })
})

