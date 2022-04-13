import { useState } from 'react'


const CalendarAddTask = ({ addNote, date, setTrigger }) => {
  const [task, setTask] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!task) {
      alert('Please add a task')
      return
    }
    console.log('task, date', task, date);
    addNote({ task, date })

    setTask('')
    setTrigger(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='task'
          placeholder='Lägg till en ny anteckning'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default CalendarAddTask
