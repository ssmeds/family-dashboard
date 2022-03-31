import './firstSetup.css'
import { useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
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
      button: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #c2bf27 30%, #ff5378 90%)',
      }
    },
  }
})


const FirstSetup = () => {
  const [setupInputFields, setSetupInputFields] = useState([
    { firstName: '', personalNumber: '' },
  ]);
  const { classes } = useStyles()

  const handleChangeInput = (e, i) => {
    console.log(e.target.value, i);
    const values = [...setupInputFields]
    values[i][e.target.name] = e.target.value;
    setSetupInputFields(values)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('inputFields:', setupInputFields)
  }

  const handleAddFields = () => {
    console.log('add a field');
    setSetupInputFields([...setupInputFields, { firstName: '', personalNumber: '' }])
  }

  const handleRemoveFields = (i) => {
    console.log('remove a field');
    const values = [...setupInputFields]
    values.splice(i, 1)
    setSetupInputFields(values)
  }
  return (
    <Container >
      <h1>Lägg till familjemedlemmar</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        {setupInputFields.map((regInputField, i) => (
          <div key={i}>
            <TextField

              name='firstName'
              label='Förnamn'
              variant='filled'
              value={regInputField.firstName}
              onChange={(e) => handleChangeInput(e, i)}
            />
            <TextField

              name='personalNumber'
              label='Personnummer (6 siffror)'
              variant='filled'
              value={regInputField.personalNumber}
              onChange={(e) => handleChangeInput(e, i)}
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
  )
}
export default FirstSetup
