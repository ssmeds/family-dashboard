import './header.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ userLoggedIn, logOutUser }) => {
  console.log('user logged in', userLoggedIn);
  let currentUser = userLoggedIn;

  function firstAndLast(fname, lname) {
    let fName = fname.charAt(0).toUpperCase();
    let lName = lname.charAt(0).toUpperCase()
    let result = fName.concat(lName)
    return (
      result
    )
  }

  const handleLogOut = () => {
    console.log('jag vill logga ut nu');
    logOutUser(currentUser)
  }

  return (
    <div className="header-container">
      <h1>Family Dashboard</h1>
      <div className="header-container menu-icons">
        <Stack direction='row' spacing={2}>
          <h3>Inloggad:</h3>
          <Avatar sx={currentUser ? { bgcolor: currentUser.color } : { bgcolor: 'black' }}>{currentUser ? firstAndLast(currentUser.firstName || currentUser.spouseFirstName, currentUser.lastName || currentUser.spouseLastName) : 'None'}</Avatar>
          <Avatar sx={{ bgcolor: 'black' }}><SettingsIcon></SettingsIcon></Avatar>
          <Avatar sx={{ bgcolor: 'red' }} ><LogoutIcon onClick={() => handleLogOut()}></LogoutIcon></Avatar>
        </Stack>
      </div>
    </div>
  )
}

export default Header
