import './header.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ userLoggedIn }) => {
  console.log('user logged in', userLoggedIn);
  let currentUser;
  if (userLoggedIn) {
    currentUser = userLoggedIn.filter((user) => user.isLoggedIn === true)
    console.log('current user', currentUser);
    console.log('current user.color', currentUser.color);
  } else {
    console.log('vänta lite');
  }

  function firstAndLast(fname, lname) {
    let fName = fname.charAt(0).toUpperCase();
    let lName = lname.charAt(0).toUpperCase()
    let result = fName.concat(lName)
    return (
      result
    )
  }

  return (
    <div className="header-container">
      <h1>Family Dashboard</h1>
      <div className="header-container menu-icons">
        <Stack direction='row' spacing={2}>
          <h3>Inloggad:</h3>
          <Avatar sx={currentUser ? { bgcolor: currentUser[0].color } : { bgcolor: 'black' }}>{currentUser ? firstAndLast(currentUser[0].firstName, currentUser[0].lastName) : 'None'}</Avatar>
          <Avatar sx={{ bgcolor: 'black' }}><SettingsIcon></SettingsIcon></Avatar>
          <Avatar sx={{ bgcolor: 'red' }}><LogoutIcon></LogoutIcon></Avatar>
        </Stack>
      </div>
    </div>
  )
}

export default Header
