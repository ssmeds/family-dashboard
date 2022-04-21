import React, { useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { makeStyles } from 'tss-react/mui';
import './register.css'
import emailjs from '@emailjs/browser';


const useStyles = makeStyles()((theme) => {
  return {
    root: {
      '& .MuiTextField-root': {
        background: 'ghostwhite',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        borderStyle: 'none',
        color: 'white',
        height: 48,
        margin: theme.spacing(1.5),
      },
    },
  }
})

const Register = ({ regNewFamily }) => {
  const [regInputFields, setRegInputFields] = useState([{ firstName: '', lastName: '', email: '', password: '', showPassword: false, color: '#482ce7' }]);
  const [setupInputFields, setSetupInputFields] = useState([{ childFirstName: '', childColor: '' }]);
  const [spouseInputFields, setSpouseInputFields] = useState([{ spouseFirstName: '', spouseLastName: '', spouseEmail: '' }]);
  const { classes } = useStyles()

  const handleRegChangeInput = (e, i) => {
    // console.log(e.target.value, i);
    const values = [...regInputFields]
    values[i][e.target.name] = e.target.value.trim();
    setRegInputFields(values)
    // console.log('regInputFields', regInputFields);
  }

  const handleSetupChangeInput = (e, i) => {
    // console.log(e.target.value, i);
    const values = [...setupInputFields]
    values[i][e.target.name] = e.target.value.trim();
    setSetupInputFields(values)
  }

  const handleSpouseChangeInput = (e, i) => {
    // console.log(e.target.value, i);
    const values = [...spouseInputFields]
    values[i][e.target.name] = e.target.value.trim();
    setSpouseInputFields(values)
    // console.log('spouseInputFields', spouseInputFields);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('reginputFields:', regInputFields[0])
    // console.log('setupinputFields:', setupInputFields)
    // console.log('spouseInputFields in submit:', spouseInputFields)
    // console.log('spouseInputFields[0] in submit:', spouseInputFields[0])

    const newFamily = {
      firstName: regInputFields[0].firstName,
      lastName: regInputFields[0].lastName,
      email: regInputFields[0].email,
      password: regInputFields[0].password,
      color: regInputFields[0].color,
      familyMembers: setupInputFields,
      spouseFirstName: spouseInputFields[0].spouseFirstName,
      spouseLastName: spouseInputFields[0].spouseLastName,
      spouseEmail: spouseInputFields[0].spouseEmail,
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
    // console.log('add a field');
    setSetupInputFields([...setupInputFields, { childFirstName: '', childColor: '' }])
  }

  const handleRemoveFields = (i) => {
    // console.log('remove a field');
    const values = [...setupInputFields]
    values.splice(i, 1)
    setSetupInputFields(values)
  }


  const sendEmail = (e) => {
    e.preventDefault();
    // console.log('send email e.target', e.target);
    // console.log('spouseInputFields', spouseInputFields);

    let templateParams = {
      spouseFirstName: spouseInputFields[0].spouseFirstName,
      spouseLastName: spouseInputFields[0].spouseLastName,
      spouseEmail: spouseInputFields[0].spouseEmail,
      fromParentFirstName: regInputFields[0].firstName,
      fromParentLastName: regInputFields[0].lastName
    };
    // console.log('templateParams', templateParams);
    emailjs.send('gmail', 'invite-email', templateParams, '8lrT3DeEntYvyEf1w')
      .then(function (response) {
        // console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        // console.log('FAILED...', error);
      });

  }
  return (
    <>
      <Container className="register-container">
        <h1>Registrera dig</h1>
        <form className={classes.root} onSubmit={handleSubmit}>
          {regInputFields.map((regInputField, i) => (
            <div key={i} className='register-input-container'>
              <TextField
                className={classes.input}
                name='firstName'
                label='Förnamn'
                variant='filled'
                value={regInputField.firstName}
                onChange={(e) => handleRegChangeInput(e, i)}
              />
              <TextField
                className={classes.input}
                name='lastName'
                label='Efternamn'
                variant='filled'
                value={regInputField.lastName}
                onChange={(e) => handleRegChangeInput(e, i)}
              />
              <TextField
                className={classes.input}
                name='email'
                label='E-mail'
                variant='filled'
                value={regInputField.email}
                onChange={(e) => handleRegChangeInput(e, i)}
              />
              <TextField
                className={classes.input}
                name='password'
                type={regInputFields.showPassword ? 'text' : 'password'}
                label='Lösenord'
                variant='filled'
                value={regInputField.password}
                onChange={(e) => handleRegChangeInput(e, i)}
              />
              <TextField
                className='colorInput'
                type='color'
                name='color'
                label='Välj din färg'
                variant='filled'
                value={regInputField.color}
                onChange={(e) => handleRegChangeInput(e, i)}
              />
            </div>
          ))}

          <h1>Lägg till familjemedlemmar</h1>

          {setupInputFields.map((setupInputField, i) => (
            <div key={i} className='register-input-container child-inputs'>
              <TextField
                className={classes.input}
                name='childFirstName'
                label='Förnamn'
                variant='filled'
                value={setupInputField.firstName}
                onChange={(e) => handleSetupChangeInput(e, i)}
              />
              <TextField
                className='colorInput'
                type='color'
                name='childColor'
                label='Färg'
                variant='filled'
                value={setupInputField.childColor}
                onChange={(e) => handleSetupChangeInput(e, i)}
              />

              <IconButton
                onClick={() => handleRemoveFields(i)}
                className='icon-btn'>
                <RemoveIcon />
              </IconButton>
              <IconButton
                onClick={() => handleAddFields()}
                className='icon-btn'>
                <AddIcon />
              </IconButton>
            </div>
          ))}
          <Button
            className='submit-btn'
            variant='contained'
            color='primary'
            type='submit'
            endIcon={<Icon>send</Icon>}
            onClick={handleSubmit}
          >Spara
          </Button>
        </form>
        <form className={classes.root} onSubmit={sendEmail}>
          <h1>Lägg till förälder</h1>
          {spouseInputFields.map((spouseInputField, i) => (
            <div key={i} className='register-input-container spouse-inputs'>
              <TextField
                className={classes.input}
                name='spouseFirstName'
                label='Förnamn'
                variant='filled'
                value={spouseInputField.spouseFirstName}
                onChange={(e) => handleSpouseChangeInput(e, i)}
              />
              <TextField
                className={classes.input}
                name='spouseLastName'
                label='Efternamn'
                variant='filled'
                value={spouseInputField.spouseLastName}
                onChange={(e) => handleSpouseChangeInput(e, i)}
              />
              <TextField
                className={classes.input}
                name='spouseEmail'
                label='E-mail'
                variant='filled'
                value={spouseInputField.spouseEmail}
                onChange={(e) => handleSpouseChangeInput(e, i)}
              />
            </div>))}
          <Button
            className='submit-btn'
            variant='contained'
            color='primary'
            type='submit'
            endIcon={<Icon>send</Icon>}
          >Skicka E-mail
          </Button>
        </form>
      </Container>

    </>
  );
}
export default Register
