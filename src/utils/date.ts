import {getDP, getYear,getMonth} from "../store"

export function getFullYear():number {
    return new Date().getFullYear()
}

export function getRealMonth():number {
    return new Date().getMonth() + 1
}
export function monthHasDays(year:number,month:number):number {
    return new Date(year, month, 0).getDate()
}

export function getLastMonthHasDays():number {
    let  [year,month] = [getYear(),getMonth()]
    month--
    if(month===0){
        month=12
        year--
    }
    return monthHasDays(year, month)
}
export function getMonthHasDays():number {
    const [year,month] = [getYear(),getMonth()]
    return monthHasDays(year, month)
}

export function whatDayIsMonthFirstDay():number {
    const [year,month] = [getYear(),getMonth()]
    console.log(year,month)
    const firstDate = new Date(`${year},${month}, 01`)
    return firstDate.getDay()
}
