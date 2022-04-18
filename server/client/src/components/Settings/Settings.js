import { useState } from 'react'
import './settings.css'
import Week from '../Week/Week'

import SettingsItem from './SettingsItem'


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

const Settings = ({ settings, addSettings, deleteSettings, updateSettings, toggleComplete, userLoggedIn }) => {
  // const settings = settings;
  console.log(settings);
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

  let userSettingsList = []
  settings.map(settings => {
    if (userLoggedIn._id === settings.owner.id) {
      userSettingsList.push(settings);
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
    addSettings({ subject, assignment })

    setAssignment('')
    setSubject('')
    document.querySelector('#form-select').reset()
  }

  return (
    <div className="settings-container card">
      <div className="settings-header card-header"><h1>Läxor</h1>
        <Week /></div>

      <div className='card-list settings-list'>
        <>
          {userSettingsList.map((settings, i) => (
            <SettingsItem
              key={settings._id ? settings._id : i}
              settings={settings}
              updateSettings={updateSettings}
              deleteSettings={deleteSettings}
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
          name="settings-form-select"
          id="settings-subject-select"
          onChange={e => { setSubject(e.target.value) }}
          placeholder="Välj ämne"
          value={subject}
        >
          {options.map((item, i) => (
            <option disabled={item.disabled} key={i} value={item.value} required>{item.label}</option>
          ))}


        </select>
        <select
          name="settings-form-select"
          id="settings-familyMember-select"
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
export default Settings
