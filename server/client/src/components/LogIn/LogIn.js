import './logIn.css'
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
        background: 'ghostwhite',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        margin: theme.spacing(1),
        display: 'flex',
      },
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
  const [error, setError] = useState('')
  const { classes } = useStyles()


  const handleChangeInput = (e, i) => {
    // console.log(e.target.value, i);
    const values = [...inputFields]
    values[i][e.target.name] = e.target.value;
    setInputFields(values)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('inputFields:', inputFields[0])
    setError('')
    const userLoggingIn = {
      email: inputFields[0].email,
      password: inputFields[0].password,
    }

    // console.log('user logging in', userLoggingIn);

    const fetchUsers = async () => {
      await fetch(`${BACKEND_URL}/api/users`)
        .then((response) => response.json())
        .then((data) => {
          // console.log('userdata', data);
          let rightOGUser = data.find(user => userLoggingIn.email === user.email && userLoggingIn.password === user.password)
          // console.log('rightOGUser', rightOGUser);
          let rightSpouseUser;
          if (rightOGUser === undefined) {
            rightSpouseUser = data.find(user => userLoggingIn.email === user.spouseEmail && userLoggingIn.password === user.spousePassword)
            // console.log('rightSpouseUser', rightSpouseUser);
            let spouse = {
              spouseFirstName: rightSpouseUser.spouseFirstName,
              spouseLastName: rightSpouseUser.spouseLastName,
              spouseEmail: rightSpouseUser.spouseEmail,
              spouseColor: rightSpouseUser.spouseColor,
              familyMembers: rightSpouseUser.familyMembers,
              OGid: rightSpouseUser._id,
              firstName: rightSpouseUser.firstName,
              lastName: rightSpouseUser.lastName,
              email: rightSpouseUser.email,
              color: rightSpouseUser.color
            }
            // console.log('spouse', spouse);
            setUserLoggedInAfterLogIn(spouse)
            setUserLoggedIn(spouse)
          }

          console.log('rightOGUser, rightSpouseUser', rightOGUser, rightSpouseUser);
          // setUsers(data)
          setUserLoggedInAfterLogIn(rightOGUser)
          setUserLoggedIn(rightOGUser)
          if (rightOGUser === undefined && rightSpouseUser === undefined) {
            setError('Fel e-mail eller lösenord')
          }
        })
    }

    fetchUsers()
  }


  return (
    <div className="logIn-container">
      <Container >
        <h1>Logga in</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          {inputFields.map((inputField, i) => (
            <div key={i} className='logIn-inputs-container'>
              <TextField
                name='email'
                label='E-mail'
                placeholder='e-mail'
                variant='filled'
                value={inputField.email}
                onChange={(e) => handleChangeInput(e, i)}
              />
              <TextField
                name='password'
                type={inputFields.showPassword ? 'text' : 'password'}
                placeholder='Lösenord'
                autoComplete='new-password'
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
