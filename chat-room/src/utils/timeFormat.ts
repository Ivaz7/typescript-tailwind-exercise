import { format, toZonedTime } from 'date-fns-tz'

export const timeFormat = (timestamp?: number): string => {
  if (!timestamp) return '-'

  const utcDate = toZonedTime(timestamp, 'UTC')
  return format(utcDate, "dd MMM yyyy HH:mm 'UTC'", { timeZone: 'UTC' })
}
