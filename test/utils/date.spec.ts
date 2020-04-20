import {
    compareDate, dateParse,
    equalDate, getBackMonth, getBackYear,
    getDay,
    getFullYear,
    getLastMonthHasDays, getNextMonth, getNextYear,
    getRealMonth, joinDate,
    monthHasDays, transformDateToN, whatDayIsMonthFirstDay
} from "../../src/utils/date"


describe('utils:date', () => {
    test('get date year', () => {
        expect(getFullYear(new Date('2020/10/3'))).toBe(2020)
    })
    test('get date month', () => {
        expect(getRealMonth(new Date('2020/10/3'))).toBe(10)
    })
    test('get date day', () => {
        expect(getDay(new Date('2020/10/3'))).toBe(3)
    })
    test('monthHasDays can work', () => {
        expect(monthHasDays(2020,2)).toBe(29)
        expect(monthHasDays(2020,3)).toBe(31)
        expect(monthHasDays(2020,4)).toBe(30)
    })
    test('getLastMonthHasDays can work', () => {
        expect(getLastMonthHasDays(2020,2)).toBe(31)
        expect(getLastMonthHasDays(2020,3)).toBe(29)
        expect(getLastMonthHasDays(2020,4)).toBe(31)
    })
    test('whatDayIsMonthFirstDay can work', () => {
        expect(whatDayIsMonthFirstDay(2020,2)).toBe(6)
        expect(whatDayIsMonthFirstDay(2020,3)).toBe(0)
    })
    test('joinDate can work', () => {
        expect(joinDate(2020,2,1)).toBe('2020/2/1')
        expect(joinDate(2020,3,1)).toBe('2020/3/1')
    })
    test('transformDateToN can work', () => {
        expect(transformDateToN(new Date('2020/2/1'))).toBe('2020/2/1')
        expect(transformDateToN(new Date('2020/3/1'))).toBe('2020/3/1')
    })
    test('equalDate can work', () => {
        expect(equalDate(new Date('2020/2/1'),new Date('2020/2/1'))).toBeTruthy()
        expect(equalDate(new Date('2020/3/1'),new Date('2020/2/2'))).toBeFalsy()
    })
    test('getNextMonth can work', () => {
        expect(getNextMonth(1)).toBe(2)
        expect(getNextMonth(12)).toBe(1)
    })
    test('getBackMonth can work', () => {
        expect(getBackMonth(1)).toBe(12)
        expect(getBackMonth(2)).toBe(1)
    })
    test('getNextYear can work', () => {
        expect(getNextYear(2020,1)).toBe(2020)
        expect(getNextYear(2020,12)).toBe(2021)
    })
    test('getBackYear can work', () => {
        expect(getBackYear(2020,1)).toBe(2019)
        expect(getBackYear(2020,12)).toBe(2020)
    })
    test('compareDate can work', () => {
        expect(compareDate('2020-1','2020-2')).toBeFalsy()
        expect(compareDate('2019-12','2019-6')).toBeTruthy()
    })
    test('dateParse can work', () => {
        expect(dateParse('2020-1-1')>0).toBeTruthy()
    })
})

