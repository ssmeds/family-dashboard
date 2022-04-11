import { useState, useReducer } from 'react'
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
// const initialFormData = {
//   weekMenu: [
//     {
//       day: '',
//       dish: ''
//     }
//   ]

// }

// const initialFormData = Object.freeze({ day: '', dish: '' })
const AddWeeklyMenu = ({ addWeeklyMenu, setTrigger, day, foundWeek, weekDays }) => {
  // console.log('day', day);
  // console.log('weekly menu in addmenuitem', foundWeek);
  // console.log('weekdays in addmenuitem', weekDays);
  // const [dish, setDish] = useState('')
  // const [menu, setMenu] = useState([{ day: '', dish: '' }])
  // const [formData, setFormData] = useState(menuTemplate)
  const [formState, dispatch] = useReducer(formReducer, menuTemplate)


  const handleTextChange = (e) => {
    dispatch({
      type: 'HANDLE INPUT TEXT',
      field: e.target.name,
      payload: e.target.value
    })
    // setFormData({ ...formData, [e.target.name]: e.target.value.trim() })
    // setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData);
    console.log('formState', formState);
    let theWeekNr = parseInt(document.querySelector('#weekNr').innerHTML)
    console.log('theWeekNr', theWeekNr);
    addWeeklyMenu(formState, theWeekNr)
    setTrigger(false)
    // console.log('dishes of inputs', dish);

    // if (!dish) {
    //   alert('Please add a dish')
    //   return
    // }
    // // console.log('dish, day', dish, day);
    // // onAddMenuItem({ dish, day })

    // setDish('')
    // setTrigger(false)
  }



  return (
    <form className='addWeeklyMenu-form'>
      <div className='form-control'>
        <h1>Veckans meny</h1>
        <Week />
        {/* {Object.entries(foundWeek.weekMenu[0]).map(([day, dish], i) => {
          return (
            <div className='addWeeklyMenu-inputs'>
              <label>{day}</label>
              <input
                key={i}
                name={day}
                type='dish'
                placeholder={dish ? { dish } : 'Lägg till en ny måltid'}
                // value={dish}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )
        }
          // )<tr key={i}><th>{day}</th><td>{foundWeek.weekMenu[0][day]}</td></tr>)
        )} */}
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
