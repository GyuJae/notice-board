export const cls = (...str: string[]): string => str.join(' ')

export const dateStr = (date: Date): string => {
  const newDate = new Date(date)
  return `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`
}
