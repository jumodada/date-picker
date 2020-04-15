import {getState} from "../store"
import {SelectDayType} from "../types/methods";

export function getFullYear(date?: Date): number {
    if (!date) date = new Date()
    return date.getFullYear()
}

export function getRealMonth(date?: Date): number {
    if (!date) date = new Date()
    return date.getMonth() + 1
}

export function getDay(date?: Date): number {
    if (!date) date = new Date()
    return date.getDate()
}

export function monthHasDays(year: number, month: number): number {
    return new Date(year, month, 0).getDate()
}

export function getLastMonthHasDays(year: number, month: number): number {
    if (!year || !month) [year, month] = [getState('year'), getState('month')]
    if (--month === 0) {
        month = 12
        year--
    }
    return monthHasDays(year, month)
}

export function getMonthHasDays(year: number, month: number): number {
    return monthHasDays(year, month)
}

export function whatDayIsMonthFirstDay(year: number, month: number): number {
    const firstDate = new Date(`${year},${month}, 01`)
    return firstDate.getDay()
}

export function joinDate<T = number, U = string>(year: T | U, month: T | U, day: T | U) {
    return year + '/' + month + '/' + day
}

const selectDayType: SelectDayType = {
    date: () => {
        const date = getState('date')
        if (!date) return [0]
        let [year, month] = [getState('year'), getState('month')]
        if (year === date.getFullYear() && month === getRealMonth(date)) {
            return [getDay(date)]
        } else {
            return [0]
        }
    },
    'date-range': (year: number, month: number) => {
        const selectRange = getState('selectRange')
        let selectDay:number[] = []
        selectRange.forEach((select: string)=>{
            let ymd = select.split('/')
            if(year===Number(ymd[0])&&month===Number(ymd[1])){
                selectDay.push(Number(ymd[2]))
            }
        })
        return selectDay
    }
}

export function getSelectDay(year: number, month: number): number[] {
    const {type} = getState('options')
    return selectDayType[type as 'date'](year, month)

}

export function equalDate(preDate: Date, curDate: Date) {
    if (!preDate || !curDate) return false
    const [py, pm, pd] = [preDate.getFullYear(), preDate.getMonth(), preDate.getDate()]
    const [cy, cm, cd] = [curDate.getFullYear(), curDate.getMonth(), curDate.getDate()]
    return py === cy && pm === cm && pd === cd
}

export function getNextMonth(val: number): number {
    let month = ++val
    if (month === 13) month = 1
    return month
}

export function getBackMonth(val: number): number {
    let month = --val
    if (month === 0) month = 12
    return month
}

export function getNextYear(year: number, month: number): number {
    if (month === 12) return ++year
    return year
}

export function getBackYear(year: number, month: number): number {
    if (month === 1) return --year
    return year
}

export function getRightDate(isEnd?: boolean): Date {
    const year = getState('endYear')
    const month = getState('endMonth')
    let date = [year, month, getMonthHasDays(year, month)]
    if (typeof isEnd !== 'undefined') {
        date = [year, month, 1]
    }
    return new Date(date.join('-'))
}

export function getLeftDate(isEnd?: boolean): Date {
    const year = getState('year')
    const month = getState('month')
    if (isEnd) return new Date([year, month, monthHasDays(year, month)].join('-'))
    return new Date([year, month, 1].join('-'))
}