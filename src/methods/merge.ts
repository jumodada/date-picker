import {isObject} from "./type-of"

export default function deepMerge(...objs:any[]) {
    const target = Object.create(null)
    objs.forEach(source=>{
        if(source){
            Object.keys(source).forEach(key=>{
                let sourceVal = source[key]
                let targetVal = target[key]
                target[key] = isObject(sourceVal)
                    ? isObject(targetVal) ? deepMerge(sourceVal, targetVal) : deepMerge(sourceVal)
                    : sourceVal
            })
        }
    })
    return target
}


export function mergeOptions<T>(source:T,target?:T) {
    let mergeOptions = deepMerge(Object.create(null),source)
    if(target){
        for(const key in target){
            if(typeof target[key]!=='undefined'){
                mergeOptions[key] = target[key]
            }
        }
    }
    return mergeOptions
}




