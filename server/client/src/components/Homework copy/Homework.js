import { useState } from 'react'
import './homework.css'
import Week from '../Week/Week'

import HomeworkItem from './HomeworkItem'


// const options = [
//   { value: '', label: 'Välj ämne', disabled: true },
//   { value: 'Engelska', label: "Engelska" },
//   { value: 'Svenska', label: "Svenska" },
//   { value: 'Samhällskunskap', label: "Samhällskunskap" }
// ]

// const familyMembersOptions = [
//   { value: '', label: 'Välj familjemedlem', disabled: true },
//   { value: 'Johannes', label: "Johannes" },
//   { value: 'Samuel', label: "Samuel" },
//   { value: 'Sebastian', label: "Sebastian" }
// ]

const Homework = ({ homeworks, addHomework, deleteHomework, updateHomework, toggleComplete, userLoggedIn }) => {
  const homework = homeworks;
  console.log(homework);
  // console.log(props);

  const familyMembersOptions = []
  const options = [
    { value: '', label: 'Välj ämne', disabled: true },
    { value: 'Engelska', label: "Engelska" },
    { value: 'Svenska', label: "Svenska" },
    { value: 'Samhällskunskap', label: "Samhällskunskap" }
  ]

  if (userLoggedIn !== undefined) {
    userLoggedIn.familyMembers.map(familyMember => {

      familyMembersOptions.push({ value: '', label: 'Välj barn', disabled: true });
      familyMembersOptions.push({ value: familyMember.childFirstName, label: familyMember.childFirstName })
    })
  }


  //   const familyMembersOptions = [
  //     { value: '', label: 'Välj familjemedlem', disabled: true },
  //     { value: 'Johannes', label: "Johannes" },
  //     { value: 'Samuel', label: "Samuel" },
  //     { value: 'Sebastian', label: "Sebastian" }
  // ]

  let userHomeworkList = []
  homework.map(homework => {
    if (userLoggedIn._id === homework.owner.id) {
      userHomeworkList.push(homework);
    }
  })
  console.log('familyMembersOptions:', familyMembersOptions);
  const [subject, setSubject] = useState('');
  const [assignment, setAssignment] = useState('');
  const [familyMember, setFamilyMember] = useState('');
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
      <div className="homework-header card-header"><h1>Läxor</h1>
        <Week /></div>

      <div className='card-list homework-list'>
        <>
          {userHomeworkList.map((homework, i) => (
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
