import './menu.css'
import { useState } from 'react'
import AddMenuPopup from './AddMenuPopup'


const Menu = ({ onAddMenuItem, recipes, weeklyMenu }) => {
  console.log('recipes', recipes);
  console.log('weeklyMenu in Menu.js', weeklyMenu);
  const [buttonPopup, setButtonPopup] = useState(false)
  const [day, setDay] = useState('')

  const weekDays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']


  const handleClickOnDay = (e) => {
    console.log(e.target.previousSibling.innerHTML);
    setDay(e.target.previousSibling.innerHTML);
    setButtonPopup(true)
  }
  let foundDish;
  recipes.map((item, i) => {
    console.log(item);

    // weekDays.map(day => {
    //   if (day === item.day) {
    //     foundDish = item.dish
    //     console.log('matchande dag');
    //     console.log('matchande dish', foundDish);
    //   }
    // })
    // if (item.day === document.querySelector()) {

    // }
    return (
      <td>{item.day === day ? item.dish : '-'}</td>
    )
  })


  return (
    <div className="menu-container card">
      <div className="menu-header card-header"><h1>Matlista</h1></div>
      <table>
        <tbody>
          {weekDays.map((day, i) => {
            return (
              <tr>
                <th key={i}>
                  {day}
                </th>

                {/* <td>{foundDish}</td> */}



              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={handleClickOnDay}>Välj veckans rätter</button>
      <AddMenuPopup trigger={buttonPopup} setTrigger={setButtonPopup} onAddMenuItem={onAddMenuItem} day={day} weeklyMenu={weeklyMenu} weekDays={weekDays}>
      </AddMenuPopup>
    </div>
  )
}
export default Menu
