export interface UtilDateFormatW3CDateTimeParams {
  timestamp: number | undefined | null
  locale?: string
  dateFormat?: Intl.DateTimeFormatOptions
  timeFormat?: Intl.DateTimeFormatOptions
  separator?: string
}

export interface UtilDateFormatW3CDateTimeResult {
  date: string
  time: string
}
