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
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        // padding: '0 30px',
        margin: theme.spacing(1),
      },
      button: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #e6385e 30%, #ff53c6 90%)',
      },

    },
    colorInput: {
      input: {
        width: '50px'
      }
    }
  }
})

const LogIn = ({ setUserLoggedInAfterLogIn }) => {
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
          let rightUser = data.find(user => userLoggingIn.email === user.email && userLoggingIn.password === user.password)
          console.log('rightUser', rightUser);
          // setUsers(data)
          setUserLoggedInAfterLogIn(rightUser)

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
            <div key={i}>
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
            className={classes.button}
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
