import './menu.css'
import { useState } from 'react'
import AddMenuPopup from './AddMenuPopup'

const Menu = ({ onAddMenuItem }) => {
  const [buttonPopup, setButtonPopup] = useState(false)
  const [day, setDay] = useState('')

  const handleClickOnDay = (e) => {
    console.log(e.target.previousSibling.innerHTML);
    setDay(e.target.previousSibling.innerHTML);
    setButtonPopup(true)
  }

  return (
    <div className="menu-container card">
      <div className="menu-header card-header"><h1>Matlista</h1></div>
      <table>
        <tbody>
          <tr><th>Måndag</th><td onClick={(e) => { handleClickOnDay(e) }}>Spenatsoppa</td></tr>
          <tr><th>Tisdag</th><td onClick={(e) => { handleClickOnDay(e) }}>Gratäng</td></tr>
          <tr><th>Onsdag</th><td onClick={(e) => { handleClickOnDay(e) }}>Stuvning</td></tr>
          <tr><th>Torsdag</th><td onClick={(e) => { handleClickOnDay(e) }}>Pizza</td></tr>
          <tr><th>Fredag</th><td onClick={(e) => { handleClickOnDay(e) }}>Falafel</td></tr>
          <tr><th>Lördag</th><td onClick={(e) => { handleClickOnDay(e) }}>Linssoppa</td></tr>
          <tr><th>Söndag</th><td onClick={(e) => { handleClickOnDay(e) }}>Rester</td></tr>
        </tbody>
      </table>
      <AddMenuPopup trigger={buttonPopup} setTrigger={setButtonPopup} onAddMenuItem={onAddMenuItem} day={day}>
      </AddMenuPopup>
    </div>
  )
}
export default Menu
