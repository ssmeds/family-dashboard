import { useState, useEffect } from 'react'
import buildCalender from './buildCalendar'
import CalendarHeader from './CalendarHeader'
import { dayStyles } from './calendarStyles'
import CalendarPopup from './CalendarPopup'
import './calendar.css'




const CalendarView = ({ value, onChange, onAdd, todos }) => {
  console.log('todos', todos);
  const [calendar, setCalendar] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false)
  const [date, setDate] = useState('')
  useEffect(() => {

    setCalendar(buildCalender(value, todos))
  }, [value, todos])



  return (
    <div className="calendar-container card">
      <div className='calendar' key={Math.floor(Math.random() * 10000) + 1}>
        <CalendarHeader value={value} setValue={onChange} />
        <div key={Math.floor(Math.random() * 10000) + 1} className='body'>
          <div className='day-names' key={Math.floor(Math.random() * 1000) + 1}>
            {
              ['m', 't', 'o', 't', 'f', 'l', 's'].map((d) => (<div key={Math.floor(Math.random() * 10000) + 1} className="week">{d}</div>
              ))}
          </div>
          {calendar.map((week) => (
            <div key={Math.floor(Math.random() * 10000) + 1} className='flex'>
              {week.map((day) => (
                <div className='day' key={Math.floor(Math.random() * 10000) + 1}
                  onClick={(e) => {
                    let date = day.format('L')
                    setDate(date)
                    onChange(day)
                    setButtonPopup(true)
                  }}
                >
                  <div className={dayStyles(day, value)} key={Math.floor(Math.random() * 10000) + 1}>
                    {day.format('D')}

                  </div>
                  {todos.map((todo) => {
                    return (
                      todo.date === day.format('L') ? <li key={Math.floor(Math.random() * 10000) + 1} className='todos'>{todo.task}</li> : ''
                    )
                  })}

                </div>))}
            </div>))}
        </div>
        <CalendarPopup trigger={buttonPopup} setTrigger={setButtonPopup} date={date} onAdd={onAdd}>
          <h3>{date}</h3>
        </CalendarPopup>
      </div>
    </div>
  )
}
export default CalendarView
