import { CgClose } from 'react-icons/cg'
// import AddWeeklyMenu from './AddWeeklyMenu'

const SettingsPopup = (props) => {
  console.log('props', props);
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <h1>Settings</h1>
        <h3>Dina uppgifter</h3>
        <p>Förnamn: {props.userLoggedIn.firstName}</p>
        <p>Efternamn: {props.userLoggedIn.lastName}</p>
        <p>Email: {props.userLoggedIn.email}</p>
        <p>Färg: <input type="color" value={props.userLoggedIn.color} /></p>
        <p>Lösenord:</p>
        <h3>Partner</h3>
        <p>Förnamn: {props.userLoggedIn.spouseFirstName}</p>
        <p>Efternamn: {props.userLoggedIn.spouseLastName}</p>
        <p>Email: {props.userLoggedIn.spouseEmail}</p>
        <p>Färg: <input type="color" value={props.userLoggedIn.spouseColor} /></p>
        <h3>Era barn</h3>
        {props.userLoggedIn.familyMembers.map(child => {
          return (
            <div>
              <p>Förnamn: {child.childFirstName}</p>
              <p>Färg: <input type="color" value={child.childColor} /></p>
            </div>
          )
        })}
        {/* <AddWeeklyMenu addWeeklyMenu={props.addWeeklyMenu} setTrigger={props.setTrigger} day={props.day} foundWeek={props.foundWeek} weekDays={props.weekDays}></AddWeeklyMenu> */}
        <CgClose className="close-btn" onClick={() => props.setTrigger(false)} />
      </div>
    </div>
  ) : '';
}
export default SettingsPopup
