import { useState } from 'react';
import RememberItem from './RememberItem'
import './remember.css'


const Remember = ({ remembers, addRemember, deleteRemember, userLoggedIn }) => {
  // console.log('remembers from App.js', remembers);
  const [task, setTask] = useState('');
  const [familyMember, setFamilyMember] = useState('');
  // console.log('userLoggedIn', userLoggedIn);

  const options = []
  if (userLoggedIn !== undefined) {
    options.push({ value: '', label: 'Välj familjemedlem', disabled: true });
    if (userLoggedIn.familyMembers !== undefined) {
      userLoggedIn.familyMembers.map(familyMember => {
        options.push({ value: familyMember.childFirstName, label: familyMember.childFirstName })
      })
      options.push({ value: userLoggedIn.firstName, label: userLoggedIn.firstName })
      if (userLoggedIn.spouseFirstName !== undefined) {
        options.push({ value: userLoggedIn.spouseFirstName, label: userLoggedIn.spouseFirstName })
      }
    }
  }

  const handleSaveClick = (e) => {
    e.preventDefault();
    // console.log('Nu har nån klickat på sparaknappen!');
    // console.log('Ämne', task);
    // console.log('Familjemedlem', familyMember);
    addRemember({ task, familyMember })

    setTask('')
    setFamilyMember('')
    document.querySelector('#form-select').reset()
  }


  return (
    <div className="remember-container card">
      <div className="remember-header card-header"><h1>Kom-ihåg</h1></div>
      <div className="card-list remember-list">
        <RememberItem remembers={remembers} deleteRemember={deleteRemember} userLoggedIn={userLoggedIn} />
      </div>
      <form onSubmit={(e) => handleSaveClick(e)} id='form-select'>
        <input
          type="text"
          required
          name=""
          id=""
          placeholder="Fyll i kom-ihåg här..."
          value={task} onChange={(e) => { setTask(e.target.value) }}
        />
        <select
          name="remember-form-select"
          required
          id="remember-familyMember-select"
          onChange={e => { setFamilyMember(e.target.value) }}
          placeholder="Välj ämne"
          value={familyMember}
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
export default Remember
