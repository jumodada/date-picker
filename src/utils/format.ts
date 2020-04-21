import {formatKey} from "../types/options";

const token = /d{1,2}|M{1,2}|yy(?:yy)?|"[^"]*"|'[^']*'/g
const formats = {
    d(date:Date) {
        return date.getDate()
    },
    dd(date:Date) {
        return pad(date.getDate())
    },
    M(date:Date) {
        return date.getMonth() + 1
    },
    MM(date:Date) {
        return pad(date.getMonth() + 1)
    },

    yy(date:Date) {
        return String(date.getFullYear()).substr(2)
    },
    yyyy(date:Date) {
        return date.getFullYear()
    }
};
function pad(val:any, len?:number) {
    val = String(val)
    len = len || 2
    while (val.length < len) {
        val = '0' + val
    }
    return val
}

export function formatParse(date:Date,format:string):string {
    return format.replace(token,(val:string)=>
        formats[val as formatKey](date))
}