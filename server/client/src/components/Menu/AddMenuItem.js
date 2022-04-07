import { useState } from 'react'


const AddMenuItem = ({ onAddMenuItem, setTrigger, day }) => {
  console.log('day', day);
  const [dish, setDish] = useState('')

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

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <h1>Veckans meny</h1>
        <label>{day}</label>
        <input
          type='dish'
          placeholder='Lägg till en ny måltid'
          value={dish}
          onChange={(e) => setDish(e.target.value)}
        />
      </div>

      <input type='submit' value='Spara måltid' className='btn btn-block' />
    </form>
  )
}

export default AddMenuItem
