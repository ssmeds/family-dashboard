import './logIn.css'
import React, { useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      '& .MuiTextField-root': {
        // background: 'linear-gradient(45deg, #cc6a7f 30%, #4b81e6 90%)',
        background: 'ghostwhite',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        margin: theme.spacing(1),
        display: 'flex',
      },
      // button: {
      //   margin: theme.spacing(1),
      //   background: 'linear-gradient(45deg, #e6385e 30%, #ff53c6 90%)',
      // },

    },
    colorInput: {
      input: {
        width: '50px'
      }
    }
  }
})

const LogIn = ({ setUserLoggedInAfterLogIn, setUserLoggedIn }) => {
  const BACKEND_URL = 'https://familydashboard.herokuapp.com'
  const [inputFields, setInputFields] = useState([
    { email: '', password: '', showPassword: false },
  ]);
  const { classes } = useStyles()


  const handleChangeInput = (e, i) => {
    // console.log(e.target.value, i);
    const values = [...inputFields]
    values[i][e.target.name] = e.target.value;
    setInputFields(values)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('inputFields:', inputFields[0])

    const userLoggingIn = {
      email: inputFields[0].email,
      password: inputFields[0].password,
    }

    console.log('user logging in', userLoggingIn);

    const fetchUsers = async () => {
      await fetch(`${BACKEND_URL}/api/users`)
        .then((response) => response.json())
        .then((data) => {
          console.log('userdata', data);
          let rightOGUser = data.find(user => userLoggingIn.email === user.email && userLoggingIn.password === user.password)
          let rightSpouseUser;
          if (rightOGUser === undefined) {
            rightSpouseUser = data.find(user => userLoggingIn.email === user.spouseEmail && userLoggingIn.password === user.spousePassword)
            let spouse = {
              spouseFirstName: rightSpouseUser.spouseFirstName,
              spouseLastName: rightSpouseUser.spouseLastName,
              spouseEmail: rightSpouseUser.spouseEmail,
              spouseColor: rightSpouseUser.spouseColor
            }
            console.log('spouse', spouse);
            setUserLoggedInAfterLogIn(spouse)
            setUserLoggedIn(spouse)
          }

          console.log('rightOGUser, rightSpouseUser', rightOGUser, rightSpouseUser);
          // setUsers(data)
          setUserLoggedInAfterLogIn(rightOGUser)
          setUserLoggedIn(rightOGUser)

        })
    }
    fetchUsers()

    // regNewFamily(newFamily)
  }


  return (
    <div className="logIn-container">
      <Container >
        <h1>Logga in</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          {inputFields.map((inputField, i) => (
            <div key={i} className='logIn-inputs-container'>
              <TextField
                name='email'
                label='E-mail'
                variant='filled'
                value={inputField.email}
                onChange={(e) => handleChangeInput(e, i)}
              />
              <TextField
                name='password'
                type={inputFields.showPassword ? 'text' : 'password'}
                label='Lösenord'
                variant='filled'
                value={inputField.password}
                onChange={(e) => handleChangeInput(e, i)}
              />
            </div>
          ))}
          <Button
            className='submit-btn'
            variant='contained'
            color='primary'
            type='submit'
            endIcon={<Icon>send</Icon>}
            onClick={handleSubmit}
          >Logga in
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default LogIn
