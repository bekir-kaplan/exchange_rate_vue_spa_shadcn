import date from '@/utils/date'
import { debounce } from '@/utils/debounce'
import chart from '@/utils/chart'

const utils = { ...date, ...chart, debounce }

export default utils
