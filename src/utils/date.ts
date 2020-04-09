import {getState} from "../store"

export function getFullYear(date?:Date):number {
    if(!date)date = new Date()
    return date.getFullYear()
}

export function getRealMonth(date?:Date):number {
    if(!date)date = new Date()
    return date.getMonth() + 1
}

export function getDay(date?:Date):number {
    if(!date)date = new Date()
    return date.getDate()
}
export function monthHasDays(year:number,month:number):number {
    return new Date(year, month, 0).getDate()
}
export function getLastMonthHasDays():number {
    let  [year,month] = [getState('year'),getState('month')]
    if(--month===0){
        month=12
        year--
    }
    return monthHasDays(year, month)
}
export function getMonthHasDays():number {
    const [year,month] = [getState('year'),getState('month')]
    return monthHasDays(year, month)
}

export function whatDayIsMonthFirstDay():number {
    const [year,month] = [getState('year'),getState('month')]
    const firstDate = new Date(`${year},${month}, 01`)
    return firstDate.getDay()
}

export function joinDate<T=number,U=string>(year:T|U,month:T|U,day:T|U) {
    return year+'/'+month+'/'+day
}

export function getSelectDate<T=number>():number|boolean {
    let date = getState('date')
    if(!date)return 0
    let [year,month] = [getFullYear(date),getRealMonth(date)]
    if(year===getState('year')&&month===getState('month')){
        return getDay(date)
    }else{
        return false
    }
}

export function equalDate(preDate:Date,curDate:Date){
    if(!preDate||!curDate)return false
    const [py,pm,pd] = [preDate.getFullYear(),preDate.getMonth(),preDate.getDate()]
    const [cy,cm,cd] = [curDate.getFullYear(),curDate.getMonth(),curDate.getDate()]
    return py===cy&&pm===cm&&pd===cd
}
