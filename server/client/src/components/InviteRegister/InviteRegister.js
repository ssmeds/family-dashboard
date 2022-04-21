import './inviteRegister.css'
import React, { useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
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
        margin: theme.spacing(1),
      },
    },
  }
})

const InviteRegister = ({ setUserLoggedInAfterLogIn, addInvitedToDB }) => {
  // const BACKEND_URL = 'https://familydashboard.herokuapp.com'
  const [inputFields, setInputFields] = useState([
    { spouseEmail: '', spousePassword: '', showPassword: false, spouseColor: '#333' },
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
    // console.log('klick på registrera sig vid inbjudan')

    const userLoggingIn = {
      spouseEmail: inputFields[0].email,
      spousePassword: inputFields[0].password,
      spouseColor: inputFields[0].color
    }
    addInvitedToDB(userLoggingIn)

  }


  return (
    <div className="invite-register-container">
      <Container >
        <h1>Registrera dig</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          {inputFields.map((inputField, i) => (
            <div key={i} className='invite-register-inputs'>
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
              <TextField
                type='color'
                name='color'
                label='Färg'
                variant='filled'
                value={inputField.color}
                onChange={(e) => handleChangeInput(e, i)}
              />
            </div>
          ))}
          <Button
            className='submit-btn'
            variant='contained'
            type='submit'
            endIcon={<Icon>send</Icon>}
            onClick={handleSubmit}
          >Registrera dig
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default InviteRegister
