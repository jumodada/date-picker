import InitOptionsByDate from "../../initial-options"
import FlexOptions from "../../types/options"
import {getFullYear, getRealMonth} from "../../utils/date"

export default class InitState {
    reference: null | HTMLElement
    popover: null | HTMLElement
    options: FlexOptions
    visible: boolean
    selectStatus: 'none'|'done'|'selecting'
    year: number
    header: {
        ye: any
        me: any
        al: any
        ar: any
        rightYe: any
        rightMe: any
    }
    dayPage: {
        header: any
        body: any
        rightHeader: any
        rightBody: any
    }
    otherPage: {
        year: any
        month: any
    }
    month: number
    date: Date | null
    pageIdx: number
    endYear:number
    endMonth:number
    endDate:Date|null
    selectRange:string[]|[]
    dateChange:any
    constructor() {
        let [year, month] = [getFullYear(), getRealMonth()]
        let [endYear, endMonth] = [year, month + 1]
        if (month === 12) {
            endYear++
            endMonth = 1
        }
        this.reference = null
        this.popover = null
        this.options = new InitOptionsByDate()
        this.visible = false
        this.year = year
        this.month = month
        this.endYear = endYear
        this.endMonth = endMonth
        this.date = null
        this.endDate = null
        this.header = {
            ye: null,
            me: null,
            al: null,
            ar: null,
            rightYe: null,
            rightMe: null
        }
        this.dayPage = {
            header: null,
            body: null,
            rightHeader: null,
            rightBody: null
        }
        this.otherPage = {
            month: null,
            year: null
        }
        this.pageIdx = 0
        this.selectRange = []
        this.selectStatus = 'none'
        this.dateChange = null
    }
}