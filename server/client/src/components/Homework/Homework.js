import { useState } from 'react'
import './homework.css'
import Week from '.././Week/Week'

import HomeworkItem from './HomeworkItem'


const Homework = ({ homeworks, addHomework, deleteHomework, updateHomework, toggleComplete, userLoggedIn }) => {
  const [subject, setSubject] = useState('');
  const [assignment, setAssignment] = useState('');
  const [familyMember, setFamilyMember] = useState('');

  const familyMembersOptions = []

  //I will add more subjects in the future and maybe let the user add their own subjects
  const options = [
    { value: '', label: 'Välj ämne', disabled: true },
    { value: 'Engelska', label: "Engelska" },
    { value: 'Svenska', label: "Svenska" },
    { value: 'Samhällskunskap', label: "Samhällskunskap" }
  ]
  // console.log('userLoggedIn', userLoggedIn);
  if (userLoggedIn !== undefined) {
    familyMembersOptions.push({ value: '', label: 'Välj barn', disabled: true });
    if (userLoggedIn.familyMembers !== undefined) {
      userLoggedIn.familyMembers.map(familyMember => {
        familyMembersOptions.push({ value: familyMember.childFirstName, label: familyMember.childFirstName })
      })
    }
  }

  // console.log('userHomeworklist', userHomeworkList);
  // console.log('familyMembersOptions:', familyMembersOptions);
  // console.log(userLoggedIn);
  // console.log(homeworks);

  const handleSaveClick = (e) => {
    e.preventDefault();
    // console.log('Nu har nån klickat på sparaknappen!');
    // console.log('Ämne', subject);
    addHomework({ subject, assignment, familyMember })

    setAssignment('')
    setSubject('')
    setFamilyMember('')
    document.querySelector('#form-select').reset()
  }

  return (
    <div className="homework-container card">
      <div className="homework-header card-header"><h1>Läxor</h1>
        <Week /></div>

      <div className='card-list homework-list'>
        <>
          <HomeworkItem
            homeworks={homeworks}
            updateHomework={updateHomework}
            deleteHomework={deleteHomework}
            toggleComplete={toggleComplete}
            userLoggedIn={userLoggedIn}
          />
        </>
      </div>

      <form onSubmit={handleSaveClick} id='form-select'>
        <input
          type="text"
          required
          name=""
          id=""
          placeholder="Fyll i läxan här..."
          value={assignment} onChange={(e) => { setAssignment(e.target.value) }}
        />
        <select
          required
          name="homework-form-select"
          id="homework-subject-select"
          onChange={e => { setSubject(e.target.value) }}
          placeholder="Välj ämne"
          value={subject}
        >
          {options.map((item, i) => (
            <option disabled={item.disabled} key={i} value={item.value} required>{item.label}</option>
          ))}
        </select>
        <select
          name="homework-form-select"
          id="homework-familyMember-select"
          onChange={e => { setFamilyMember(e.target.value) }}
          placeholder="Välj familjemedlem"
          value={familyMember}
        >
          {familyMembersOptions.map((item, i) => (
            <option disabled={item.disabled} key={i} value={item.value}>{item.label}</option>
          ))}
        </select>
        <button>Spara</button>
      </form>
    </div>
  )
}
export default Homework
