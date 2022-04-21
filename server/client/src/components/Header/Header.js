import './header.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import SettingsPopup from '../Settings/SettingsPopup'

const Header = ({ userLoggedIn, logOutUser, updateUserInformation }) => {
  // console.log('user logged in', userLoggedIn);
  const [buttonPopup, setButtonPopup] = useState(false)
  let currentUser = userLoggedIn;
  // console.log('current user', currentUser);

  const displayFullName = (fname, lname) => {
    return `${fname} ${lname}`
  }

  const handleLogOut = () => {
    // console.log('jag vill logga ut nu');
    logOutUser(currentUser)
  }

  const handleSettingsClick = () => {
    // console.log('jag vill se mina settings');
    setButtonPopup(true)
  }

  return (
    <div className="header-container">
      <h1>Family Dashboard</h1>
      <div className="header-container menu-icons">
        <Stack direction='row' spacing={2}>
          <h2 className='display-username' style={currentUser ? { color: currentUser.color, borderColor: currentUser.color } : { color: 'black' }}>{currentUser.OGid ? displayFullName(currentUser.spouseFirstName, currentUser.spouseLastName) : displayFullName(currentUser.firstName, currentUser.lastName)}</h2>
          <Avatar sx={{ bgcolor: 'black' }}><SettingsIcon onClick={() => handleSettingsClick()}></SettingsIcon></Avatar>
          <Avatar sx={{ bgcolor: 'red' }} ><LogoutIcon onClick={() => handleLogOut()}></LogoutIcon></Avatar>
        </Stack>
      </div>
      <SettingsPopup updateUserInformation={updateUserInformation} trigger={buttonPopup} setTrigger={setButtonPopup} userLoggedIn={userLoggedIn}>
      </SettingsPopup>
    </div>
  )
}

export default Header
