import dayjs, { Dayjs } from 'dayjs'
import { TimeBeforeOrder } from '../constants/constants'

interface IGenerateWeekdays {
    dayofweek: string
    date: string
}

export const isBookingAllowed = (activeDate: string): boolean => {
    const today = dayjs()
    const activeDay = dayjs(activeDate.split('/').reverse().join('/'))
    const currentHour = today.hour()
    return !(currentHour >= TimeBeforeOrder && today.isSame(activeDay, 'day'))
}

export const generateWeekDays = (): IGenerateWeekdays[] => {
    const today: Dayjs = dayjs().startOf('day')
    const endOfWeek: Dayjs = today.add(6, 'day').endOf('day')

    dayjs.locale('sr')
    const weekdayRange: IGenerateWeekdays[] = []

    let currentDay = dayjs(today)
    while (currentDay.isBefore(endOfWeek)) {
        if (currentDay.day() !== 0) {
            weekdayRange.push({
                dayofweek: currentDay
                    .format('ddd')
                    .toLocaleUpperCase()
                    .replace('.', ''),
                date: currentDay.format('DD/MM/YYYY'),
            })
        }
        currentDay = currentDay.add(1, 'day')
    }

    return weekdayRange
}
