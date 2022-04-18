import { useState, useEffect } from 'react'
import buildCalender from './buildCalendar'
import CalendarHeader from './CalendarHeader'
import { dayStyles } from './calendarStyles'
import CalendarPopup from './CalendarPopup'
import './calendar.css'
import { format } from 'date-fns'



const CalendarView = ({ value, onChange, addNote, notes, userLoggedIn }) => {
  // console.log('todos.date', todos[0].date);
  // console.log('logged in user', userLoggedIn);
  let formattedDates = notes.map(item => {
    // console.log('nytt datum', item.date);
    return { ...item, date: item.date.slice(0, 10) }
  })
  // console.log('new todos after slice', formattedDates)
  // console.log('notes', notes);
  const [calendar, setCalendar] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false)
  const [date, setDate] = useState('')
  useEffect(() => {
    // console.log('inuti useeffect med value');
    setCalendar(buildCalender(value))
  }, [value])

  let userNotesList = []
  formattedDates.map(note => {
    if (note.owner.id === userLoggedIn._id) {
      userNotesList.push(note)
    }
  })
  // console.log('userNotesList', userNotesList);
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
                  {userNotesList.map((note) => {
                    // console.log('note i userNotesList.map', note);
                    // console.log('note date i userNotesList.map', note.date);
                    // console.log('day.format i userNotesList.map', day.format('L'));
                    return (
                      note.date === day.format('L') ? <li key={Math.floor(Math.random() * 10000) + 1} className='todos'>{note.task}</li> : ''
                    )
                  })}

                </div>))}
            </div>))}
        </div>
        <CalendarPopup trigger={buttonPopup} setTrigger={setButtonPopup} date={date} addNote={addNote}>
          <h3>{date}</h3>
        </CalendarPopup>
      </div>
    </div>
  )
}
export default CalendarView
