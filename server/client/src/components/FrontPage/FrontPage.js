import './frontPage.css';
import { useState } from 'react'
// import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import LoginIcon from '@mui/icons-material/Login';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';
import InviteRegister from '../InviteRegister/InviteRegister';
import { makeStyles } from 'tss-react/mui'
import HomeIcon from '@mui/icons-material/Home';

// const useStyles = makeStyles()((theme) => {
//   return {
//     button: {
//       width: '250px',
//       marginBottom: '1rem',



//     }
//   }
// })

const FrontPage = ({ regNewFamily, setUserLoggedInAfterLogIn, addInvitedToDB, setUserLoggedIn }) => {

  const [showLogIn, setShowLogIn] = useState(false)
  const [showReg, setShowReg] = useState(false)
  const [showInviteReg, setShowInviteReg] = useState(false)
  const [showLogInAndReg, setShowLogInAndReg] = useState(true)

  // const { classes } = useStyles()

  const handleLogIn = (e) => {
    console.log('user wants to log in', e)
    setShowLogIn(true)
    setShowLogInAndReg(false)
  }

  const handleReg = (e) => {
    console.log('user wants to register', e)
    setShowReg(true)
    setShowLogIn(false)
    setShowLogInAndReg(false)
  }

  const handleInvite = (e) => {
    console.log('user wants to register after invite', e)
    setShowReg(false)
    setShowLogIn(false)
    setShowLogInAndReg(false)
    setShowInviteReg(true)
  }

  const handleHomeClick = () => {
    console.log('klick på hemikonen');
    setShowLogInAndReg(true)
  }

  return (
    <div className="frontPage-container">
      <HomeIcon className="home-icon" sx={{ cursor: 'pointer', fontSize: '3rem', alignContent: 'left' }} onClick={() => handleHomeClick()} />
      {showLogInAndReg ? (
        <>
          <h1 id="frontPage-h1">Välkommen till <span className='title'>Family Dashboard</span></h1>
          <div className="fronPage-container menu-icons">
            <Stack direction='column' spacing={2}>
              <Button className='logIn-btn' variant="contained" onClick={(e) => handleLogIn(e)}>Logga in</Button>
              <Button className='reg-btn' variant="contained" onClick={(e) => handleReg(e)}>Registrera dig</Button>
              <Button className='invite-btn' variant="contained" onClick={(e) => handleInvite(e)}>Har du fått en inbjudan?</Button>
            </Stack>
          </div>
        </>
      ) : showLogIn ? (
        <>
          <LogIn setUserLoggedInAfterLogIn={setUserLoggedInAfterLogIn} setUserLoggedIn={setUserLoggedIn} />
          <Button className='reg-btn' id='reg-btn' variant="contained" onClick={(e) => handleReg(e)}>Registrera en ny familj</Button>
        </>
      ) : showReg ? (
        <>
          <Register regNewFamily={regNewFamily} />
          <Button className='logIn-btn' id='logIn-btn' variant="contained" onClick={(e) => handleLogIn(e)}>Logga in</Button>
        </>
      ) : showInviteReg ? (
        <>
          <InviteRegister addInvitedToDB={addInvitedToDB} setUserLoggedInAfterLogIn={setUserLoggedInAfterLogIn} />
          <Button className='reg-btn' id='reg-btn' variant="contained" onClick={(e) => handleReg(e)}>Registrera en ny familj</Button>
          <Button className='logIn-btn' id='logIn-btn' variant="contained" onClick={(e) => handleLogIn(e)}>Logga in</Button>
        </>
      ) : ''}



    </div>
  )
}

export default FrontPage
