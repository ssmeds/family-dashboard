import './register.css'
import FirstSetup from '../FirstSetup/FirstSetup'
import React, { useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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



const Register = ({ regNewFamily }) => {

  const [regInputFields, setRegInputFields] = useState([
    { firstName: '', lastName: '', email: '', password: '', showPassword: false, color: '' },
  ]);
  const [setupInputFields, setSetupInputFields] = useState([
    { childFirstName: '', personalNumber: '', color: '' },
  ]);
  const { classes } = useStyles()

  const handleRegChangeInput = (e, i) => {
    // console.log(e.target.value, i);
    const values = [...regInputFields]
    values[i][e.target.name] = e.target.value;
    setRegInputFields(values)
  }

  const handleSetupChangeInput = (e, i) => {
    // console.log(e.target.value, i);
    const values = [...setupInputFields]
    values[i][e.target.name] = e.target.value;
    setSetupInputFields(values)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('reginputFields:', regInputFields[0])
    console.log('setupinputFields:', setupInputFields)

    const newFamily = {
      firstName: regInputFields[0].firstName,
      lastName: regInputFields[0].lastName,
      email: regInputFields[0].email,
      password: regInputFields[0].password,
      color: regInputFields[0].color,
      familyMembers: setupInputFields
    }

    console.log('newFamily', newFamily);
    regNewFamily(newFamily)
  }

  const handleClickShowPassword = () => {
    setRegInputFields({
      ...regInputFields,
      showPassword: !regInputFields.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleAddFields = () => {
    console.log('add a field');
    setSetupInputFields([...setupInputFields, { childFirstName: '', personalNumber: '', color: '' }])
  }

  const handleRemoveFields = (i) => {
    console.log('remove a field');
    const values = [...setupInputFields]
    values.splice(i, 1)
    setSetupInputFields(values)
  }
  return (
    <>
      <Container >
        <h1>Registrera dig</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          {regInputFields.map((regInputField, i) => (
            <div key={i}>
              <TextField
                name='firstName'
                label='Förnamn'
                variant='filled'
                value={regInputField.firstName}
                onChange={(e) => handleRegChangeInput(e, i)}
              />
              <TextField
                name='lastName'
                label='Efternamn'
                variant='filled'
                value={regInputField.lastName}
                onChange={(e) => handleRegChangeInput(e, i)}
              />
              <TextField
                name='email'
                label='E-mail'
                variant='filled'
                value={regInputField.email}
                onChange={(e) => handleRegChangeInput(e, i)}
              />
              <TextField
                name='password'
                type={regInputFields.showPassword ? 'text' : 'password'}
                label='Lösenord'
                variant='filled'
                value={regInputField.password}
                onChange={(e) => handleRegChangeInput(e, i)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {regInputFields.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <TextField
                className={classes.colorInput}
                type='color'
                name='color'
                label='Färg'
                variant='filled'
                value={regInputField.color}
                onChange={(e) => handleSetupChangeInput(e, i)}
              />
            </div>
          ))}


          <h1>Lägg till familjemedlemmar</h1>

          {setupInputFields.map((setupInputField, i) => (
            <div key={i}>
              <TextField
                name='childFirstName'
                label='Förnamn'
                variant='filled'
                value={setupInputField.firstName}
                onChange={(e) => handleSetupChangeInput(e, i)}
              />
              <TextField
                name='personalNumber'
                label='Personnummer (6 siffror)'
                variant='filled'
                value={setupInputField.personalNumber}
                onChange={(e) => handleSetupChangeInput(e, i)}
              />
              <TextField
                className={classes.colorInput}
                type='color'
                name='color'
                label='Färg'
                variant='filled'
                value={setupInputField.color}
                onChange={(e) => handleSetupChangeInput(e, i)}
              />

              <IconButton
                onClick={() => handleRemoveFields(i)}>
                <RemoveIcon />
              </IconButton>
              <IconButton
                onClick={() => handleAddFields()}>
                <AddIcon />
              </IconButton>
            </div>
          ))}
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            type='submit'
            endIcon={<Icon>send</Icon>}
            onClick={handleSubmit}
          >Send
          </Button>
        </form>
      </Container>

    </>
  );
}
export default Register
