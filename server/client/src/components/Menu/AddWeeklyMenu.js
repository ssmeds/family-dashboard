import { useReducer } from 'react'
import Week from '.././Week/Week'
import formReducer from './menuReducer'

const menuTemplate = {
  'Måndag': '',
  'Tisdag': '',
  'Onsdag': '',
  'Torsdag': '',
  'Fredag': '',
  'Lördag': '',
  'Söndag': ''
}

const AddWeeklyMenu = ({ addWeeklyMenu, setTrigger, day, foundWeek, weekDays }) => {
  // console.log('day', day);
  // console.log('weekly menu in addmenuitem', foundWeek);
  // console.log('weekdays in addmenuitem', weekDays);
  const [formState, dispatch] = useReducer(formReducer, menuTemplate)


  const handleTextChange = (e) => {
    dispatch({
      type: 'HANDLE INPUT TEXT',
      field: e.target.name,
      payload: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('formState', formState);
    let theWeekNr = parseInt(document.querySelector('#weekNr').innerHTML)
    // console.log('theWeekNr', theWeekNr);
    addWeeklyMenu(formState, theWeekNr)
    setTrigger(false)
  }

  return (
    <form className='addWeeklyMenu-form'>
      <div className='form-control'>
        <h1>Veckans meny</h1>
        <Week />
        <div className='addWeeklyMenu-inputs'>
          <label>Måndag</label>
          <input
            type="text"
            name="Måndag"
            value={formState.day}
            onChange={(e) => handleTextChange(e)}
          />
        </div>
        <div className='addWeeklyMenu-inputs'>
          <label>Tisdag</label>
          <input type="text"
            name="Tisdag"
            value={formState.day}
            onChange={(e) => handleTextChange(e)} />
        </div>
        <div className='addWeeklyMenu-inputs'>
          <label>Onsdag</label>
          <input type="text"
            name="Onsdag"
            value={formState.day}
            onChange={(e) => handleTextChange(e)} />
        </div>
        <div className='addWeeklyMenu-inputs'>
          <label>Torsdag</label>
          <input type="text"
            name="Torsdag"
            value={formState.day}
            onChange={(e) => handleTextChange(e)} />
        </div>
        <div className='addWeeklyMenu-inputs'>
          <label>Fredag</label>
          <input type="text"
            name="Fredag"
            value={formState.day}
            onChange={(e) => handleTextChange(e)} />
        </div>
        <div className='addWeeklyMenu-inputs'>
          <label>Lördag</label>
          <input type="text"
            name="Lördag"
            value={formState.day}
            onChange={(e) => handleTextChange(e)} />
        </div>
        <div className='addWeeklyMenu-inputs'>
          <label>Söndag</label>
          <input type="text"
            name="Söndag"
            value={formState.day}
            onChange={(e) => handleTextChange(e)} />
        </div>
      </div>
      <input type='submit' value='Spara veckomenyn' className='btn btn-block' onClick={handleSubmit} />
    </form>
  )
}

export default AddWeeklyMenu
