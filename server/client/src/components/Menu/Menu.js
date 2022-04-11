import './menu.css'
import { useState } from 'react'
import AddMenuPopup from './AddMenuPopup'
import Week from '.././Week/Week'
import moment from 'moment/min/moment-with-locales'

const Menu = ({ addWeeklyMenu, recipes, weeklyMenu }) => {
  console.log('recipes', recipes);
  console.log('weeklyMenu in Menu.js', weeklyMenu);
  const [buttonPopup, setButtonPopup] = useState(false)
  const [day, setDay] = useState('')

  const weekDays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']

  let thisWeekNr = moment().weeks();
  let foundWeeks = [];
  let list = [];
  let foundWeek;

  weeklyMenu.map(week => {
    if (week.weekNr === thisWeekNr) {
      foundWeeks.push(week)
    }
  })
  console.log('foundWeeks', foundWeeks);
  console.log('last element in weeklyMenu', foundWeeks.at(-1));
  console.log('foundWeeks', foundWeeks);

  foundWeek = foundWeeks.at(-1)
  console.log('foundWeek.weekMenu', foundWeek.weekMenu);
  if (foundWeek.weekMenu[0] != undefined) {
    for (const day in foundWeek.weekMenu[0]) {
      console.log(`${day}: ${foundWeek.weekMenu[0][day]}`);
      list.push(<tr key={day}><th>{day}</th><td>{foundWeek.weekMenu[0][day]}</td></tr>);
    }
  }
  else {
    for (const day in foundWeek.weekMenu) {
      console.log(`${day}: ${foundWeek.weekMenu[day]}`);
      list.push(<tr key={day}><th>{day}</th><td>{foundWeek.weekMenu[day]}</td></tr>);
    }
  }

  console.log(foundWeek.weekMenu);

  const handleClickOnDay = (e) => {
    console.log(e.target.previousSibling.innerHTML);
    setDay(e.target.previousSibling.innerHTML);
    setButtonPopup(true)
  }
  return (
    <div className="menu-container card">
      <div className="menu-header card-header"><h1>Matlista</h1><Week /></div>
      <table>
        <tbody>
          {list}
        </tbody>
      </table>
      <button onClick={handleClickOnDay}>Välj veckans rätter</button>
      <AddMenuPopup trigger={buttonPopup} setTrigger={setButtonPopup} addWeeklyMenu={addWeeklyMenu} day={day} foundWeek={foundWeek} weekDays={weekDays}>
      </AddMenuPopup>
    </div>
  )
}
export default Menu
