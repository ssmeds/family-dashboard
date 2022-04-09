import { useState } from 'react'
import Week from '.././Week/Week'

// const initialFormData = Object.freeze({ day: '', dish: '' })
const AddMenuItem = ({ addWeeklyMenu, setTrigger, day, weeklyMenu, weekDays }) => {
  // console.log('day', day);
  // console.log('weekly menu in addmenuitem', weeklyMenu);
  // console.log('weekdays in addmenuitem', weekDays);
  // const [dish, setDish] = useState('')
  // const [menu, setMenu] = useState([{ day: '', dish: '' }])
  const [formData, setFormData] = useState({})


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() })
    // setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    let theWeekNr = document.querySelector('#weekNr').innerHTML
    console.log('theWeekNr', theWeekNr);
    addWeeklyMenu(formData, theWeekNr)
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

  // const handleChangeInput = (e, i) => {
  //   // console.log(e.target.value);
  //   // console.log('e.target.name', e.target.name);

  //   // const values = [...menu]
  //   // values[i].e.target.value = e.target.value
  //   // setMenu([...menu], e.target.value)
  //   setDish([...dish, e.target.value])
  // }



  // console.log('menu state', menu);
  // console.log('dish state', dish);
  // console.log('form state', formData);

  return (
    <form className='addWeeklyMenu-form'>
      <div className='form-control'>
        <h1>Veckans meny</h1>
        <Week />
        {weekDays.map(day => {
          return (
            <div className='addWeeklyMenu-inputs'>
              <label>{day}</label>
              <input
                name={day}
                type='dish'
                placeholder='Lägg till en ny måltid'
                // value={dish}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )
        })}

      </div>

      <input type='submit' value='Spara veckomenyn' className='btn btn-block' onClick={handleSubmit} />
    </form>
  )
}

export default AddMenuItem
