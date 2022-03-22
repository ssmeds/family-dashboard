const CalendarHeader = ({ value, setValue }) => {
  const svValue = value.locale('sv')
  const currMonthName = () => {
    return svValue.format('MMMM')
  }

  const currYear = () => {
    return svValue.format('YYYY')
  }
  const prevMonth = () => {
    return svValue.clone().subtract(1, 'month')
  }
  const nextMonth = () => {
    return svValue.clone().add(1, 'month')
  }

  return (
    <div className='header'>
      <div className='previous'
        onClick={() => setValue(prevMonth())}>{String.fromCharCode(171)}</div>
      <div className='current'>{currMonthName()} {currYear()}</div>
      <div className='next'
        onClick={() => setValue(nextMonth())}>{String.fromCharCode(187)}</div>
    </div>
  )
}

export default CalendarHeader
