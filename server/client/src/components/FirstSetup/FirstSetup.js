import './firstSetup.css'
import { useState } from 'react'

const FirstSetup = React.createClass({ addNewUser }) => {
  const [newUser, setNewUser] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Registrera any användare');
    // console.log(e.target.firstName.value);
    // console.log(e.target.lastName.value);
    // console.log(e.target.email.value);
    // console.log(e.target.select);
    let select = document.querySelector("#select-role")
    // console.log(select.options[select.selectedIndex].value)
    const newUser = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      role: select.options[select.selectedIndex].value,
      password: e.target.password.value,
    }
    console.log('Ny användare', newUser);

    setNewUser(newUser);
    addNewUser(newUser);

    document.querySelector('#register-form').reset();

  }
  return (
    <div className="register-container">
      <form id="register-form" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="firstName" placeholder="Förnamn" />
        <input type="text" name="lastName" placeholder="Efternamn" />
        <input type="email" name="email" id="" placeholder="E-mail" />
        <select name="select" id="select-role">
          <option value="Roll">Roll</option>
          <option value="Förälder">Förälder</option>
          <option value="Anhörig">Anhörig</option>
        </select>
        <input type="password" name="password" id="" placeholder="Lösenord" />
        <button>Registrera dig</button>
      </form>

    </div>
  )
}
export default FirstSetup = React.createClass({
