function formatDateToDayMonthYear(dateInYearMonthDay: string) {
  return `${dateInYearMonthDay.slice(8)}/${dateInYearMonthDay.slice(
    5,
    7
  )}/${dateInYearMonthDay.slice(0, 4)}`;
}

function formatDateToYearMonthDay(dateInDayMonthYear: string) {
  return `${dateInDayMonthYear.slice(6)}-${dateInDayMonthYear.slice(
    3,
    5
  )}-${dateInDayMonthYear.slice(0, 2)}`;
}

export { formatDateToDayMonthYear, formatDateToYearMonthDay };
