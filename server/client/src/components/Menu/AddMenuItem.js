import { useState } from 'react'


const AddMenuItem = ({ onAddMenuItem, setTrigger, day, weeklyMenu, weekDays }) => {
  // console.log('day', day);
  // console.log('weekly menu in addmenuitem', weeklyMenu);
  // console.log('weekdays in addmenuitem', weekDays);
  const [dish, setDish] = useState('')
  const [menu, setMenu] = useState([{ day: '', dish: '' }])
  const [formData, setFormData] = useState({})

  const onSubmit = (e) => {
    e.preventDefault()

    if (!dish) {
      alert('Please add a dish')
      return
    }
    console.log('dish, day', dish, day);
    onAddMenuItem({ dish, day })

    setDish('')
    setTrigger(false)
  }

  const handleChangeInput = (e, i) => {
    console.log(e.target.value);
    console.log('e.target.name', e.target.name);

    // const values = [...menu]
    // values[i].e.target.value = e.target.value
    // setMenu([...menu], e.target.value)
    setDish([...dish, e.target.value])
  }

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  console.log('menu state', menu);
  console.log('dish state', dish);
  console.log('form state', formData);

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <h1>Veckans meny</h1>
        {weekDays.map(day => {
          return (
            <div>
              <label>{day}</label>
              <input
                name={day}
                type='dish'
                placeholder='Lägg till en ny måltid'
                // value={dish}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
          )
        })}

      </div>

      <input type='submit' value='Spara veckomenyn' className='btn btn-block' />
    </form>
  )
}

export default AddMenuItem
