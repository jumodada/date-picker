import {getYear} from "../store";

export function getFullYear() {
    return new Date().getFullYear()
}

export function getMonth() {
    return new Date().getMonth() + 1
}

export function getMonthHasDays() {
    const [year,month] = [getYear(),getMonth()]
    return new Date(year, month, 0).getDate()
}