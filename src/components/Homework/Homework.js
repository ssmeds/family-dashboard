import { useState } from 'react'
import './homework.css'
import Week from '.././Week/Week'

import HomeworkItem from './HomeworkItem'


const options = [
  { value: '', label: 'Välj ämne', disabled: true },
  { value: 'Engelska', label: "Engelska" },
  { value: 'Svenska', label: "Svenska" },
  { value: 'Samhällskunskap', label: "Samhällskunskap" }
]

const Homework = ({ homeworks, addHomework, deleteHomework, updateHomework, toggleComplete }) => {
  const homework = homeworks;
  // console.log(homework);
  // console.log(props);

  const [subject, setSubject] = useState('');
  const [assignment, setAssignment] = useState('');
  // const [complete, setComplete] = useState(false);

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log('Nu har nån klickat på sparaknappen!');
    console.log('Ämne', subject);
    addHomework({ subject, assignment })

    setAssignment('')
    setSubject('')
    document.querySelector('#form-select').reset()
  }

  return (
    <div className="homework-container card">
      <h1>Läxor</h1>
      <Week />
      <div className='homework-list'>
        <>
          {homework.map((homework, i) => (
            <HomeworkItem
              key={homework._id ? homework._id : i}
              homework={homework}
              updateHomework={updateHomework}
              deleteHomework={deleteHomework}
              toggleComplete={toggleComplete}
            />
          ))}
        </>
      </div>

      <form onSubmit={handleSaveClick} id='form-select'>
        <input
          type="text"
          name=""
          id=""
          placeholder="Fyll i läxan här..."
          value={assignment} onChange={(e) => { setAssignment(e.target.value) }}
        />
        <select
          name="homework-form-select"
          id="homework-subject-select"
          onChange={e => { setSubject(e.target.value) }}
          placeholder="Välj ämne"
          value={subject}
        >
          {options.map((item, i) => (
            <option disabled={item.disabled} key={i} value={item.value}>{item.label}</option>
          ))}


        </select>
        <button>Spara</button>
      </form>
    </div>
  )
}
export default Homework