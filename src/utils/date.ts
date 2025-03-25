import type {
  UtilDateFormatW3CDateTimeParams,
  UtilDateFormatW3CDateTimeResult,
} from '@/types/utils.types'

const defaultDateFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}
const defaultTimeFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}
const defaultLocale = 'en-US'

const date = {
  formatW3CDateTime: ({
    timestamp,
    locale = defaultLocale,
    dateFormat = defaultDateFormat,
    timeFormat = defaultTimeFormat,
    separator = '/',
  }: UtilDateFormatW3CDateTimeParams): UtilDateFormatW3CDateTimeResult => {
    let formattedDate = ''
    let formattedTime = ''

    if (timestamp !== undefined && timestamp !== null) {
      const date = new Date(timestamp)

      formattedDate = new Intl.DateTimeFormat(locale, dateFormat).format(date)
      formattedTime = new Intl.DateTimeFormat(locale, timeFormat).format(date)
      formattedDate = formattedDate.replace(/[/-]/g, separator)
    }

    return {
      date: formattedDate,
      time: formattedTime,
    }
  },
  getDate: ({
    currentDate = Date.now(),
    dayBefore = 0,
    locale = defaultLocale,
    dateFormat = defaultDateFormat,
    separator = '/',
  }: {
    currentDate?: number
    dayBefore?: number
    locale?: string
    dateFormat?: Intl.DateTimeFormatOptions
    separator?: string
  }) => {
    const date = new Date(currentDate)
    date.setDate(date.getDate() - dayBefore) // Subtract specified number of days

    let formattedDate = new Intl.DateTimeFormat(locale, dateFormat).format(date)
    formattedDate = formattedDate.replace(/[/-]/g, separator)

    return formattedDate
  },
  formatDateToYYYYMMDD: ({
    year,
    month,
    day,
  }: {
    year: number
    month: number
    day: number
  }): string => {
    const paddedMonth = String(month).padStart(2, '0') // ensure 2 digits
    const paddedDay = String(day).padStart(2, '0') // ensure 2 digits
    return `${year}-${paddedMonth}-${paddedDay}`
  },
}

export default date
