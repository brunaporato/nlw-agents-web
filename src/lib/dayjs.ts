import dayjsLib from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjsLib.extend(relativeTime)

export const dayjs = dayjsLib
