import { CgClose } from 'react-icons/cg'
// import AddWeeklyMenu from './AddWeeklyMenu'
import { useState, useReducer } from 'react'
import formReducer from './formReducer'
import { Identity } from '@mui/base'



const SettingsPopup = (props) => {
  console.log('userLoggedIn', props);
  // let childArray = []
  // props.userLoggedIn.familyMembers.map(child => {
  //   childArray.push({ childFirstName: child.childFirstName, childColor: child.childColor })
  // })
  // let initialFormData = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   color: props.userLoggedIn.color,
  //   // children: []
  //   // childFirstName: '',
  //   // childColor: '',
  //   // children: childArray
  //   // children: [
  //   //   {
  //   //     childFirstName: '',
  //   //     childColor: ''
  //   //   }
  //   // ]
  // }

  // console.log('props', props);
  // const [formState, dispatch] = useReducer(formReducer, initialFormData)
  // const [child, setChild] = useState([
  //   { childFirstName: '', childColor: '', }])
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    color: props.userLoggedIn.color,
    // children: [],
    childName0: '',
    childColor0: '',
    childName1: '',
    childColor1: '',
    childColor2: '',
    childName2: '',
    childColor3: '',
    childName3: '',
    childColor4: '',
    childName4: '',
    childColor5: '',
    childName5: '',
    childColor6: '',
    childName6: '',
    childColor7: '',
    childName7: '',
    childColor8: '',
    childName8: '',
  })

  const handleChange = (event, i, id) => {
    console.log('event.target.value', event.target.value);
    console.log('event.target.name', event.target.name);
    console.log('contactInfo in change', contactInfo);
    console.log('childId', id);
    setContactInfo({
      ...contactInfo,
      [event.target.name]: event.target.value, [id]: event.target.id
      // ...contactInfo.children,
      // id: id,
      // [event.target.name]: event.target.value,
    });
  };

  // console.log('formState', formState);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('klick på uppdatera');
  //   // console.log('formState', formState);
  //   // props.updateUserInformation(formState)
  // }

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    console.log('contactinfo', contactInfo);
    setContactInfo({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      color: props.userLoggedIn.color
    })
    let newUpdatesToSave;
    for (const [key, value] of Object.entries(contactInfo)) {
      if (value !== undefined && value !== '') {
        console.log(`${key}: ${value}`);
        // newUpdatesToSave[key] = value
        // Object.assign(newUpdatesToSave, { key: value })
        newUpdatesToSave = { ...newUpdatesToSave, [key]: value }
      }
    }
    console.log('newUpdatesToSave', newUpdatesToSave);
    props.updateUserInformation(newUpdatesToSave)
  };
  // console.log('child', child);
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <h1>Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className='your-settings'>
            <h3>Dina uppgifter</h3>
            <label htmlFor="">Förnamn: </label>
            <input
              type="text"
              name='firstName'
              placeholder={props.userLoggedIn._id !== undefined ? props.userLoggedIn.firstName : props.userLoggedIn.spouseFirstName}
              value={contactInfo.firstName}
              onChange={handleChange}
            // onChange={(e) =>
            //   dispatch({
            //     type: 'HANDLE INPUT TEXT',
            //     field: e.target.name,
            //     payload: e.currentTarget.value.trim()
            //   })}
            />
            <label htmlFor="">Efternamn: </label>
            <input type="text"
              name='lastName'
              placeholder={props.userLoggedIn._id !== undefined ? props.userLoggedIn.lastName : props.userLoggedIn.spouseLastName}
              value={contactInfo.lastName}
              onChange={handleChange}
            // onChange={(e) =>
            //   dispatch({
            //     type: 'HANDLE INPUT TEXT',
            //     field: e.target.name,
            //     payload: e.currentTarget.value.trim()
            //   })}
            />
            <label htmlFor="">Email: </label>
            <input type="text"
              name='email'
              placeholder={props.userLoggedIn._id !== undefined ? props.userLoggedIn.email : props.userLoggedIn.spouseEmail}
              value={contactInfo.email}
              onChange={handleChange}
            // onChange={(e) =>
            //   dispatch({
            //     type: 'HANDLE INPUT TEXT',
            //     field: e.target.name,
            //     payload: e.currentTarget.value.trim()
            //   })}
            />
            <label htmlFor="">Lösenord: </label>
            <input type="password"
              name='password'
              placeholder='Ange ett nytt lösenord'
              value={contactInfo.password}
              onChange={handleChange}
            // onChange={(e) =>
            //   dispatch({
            //     type: 'HANDLE INPUT TEXT',
            //     field: e.target.name,
            //     payload: e.currentTarget.value.trim()
            //   })}
            />
            <label htmlFor="">Färg: </label>
            <input type="color"
              name='color'
              className='color-input'
              value={contactInfo.color}
              onChange={handleChange}
            // onChange={(e) =>
            //   dispatch({
            //     type: 'HANDLE INPUT TEXT',
            //     field: e.target.name,
            //     payload: e.currentTarget.value
            //   })}
            />
          </div>

          <div className='partner-settings'>
            {/* Om userLoggedIn._id inte är undefined betyder att det är en OGuser som loggat in*/}
            {props.userLoggedIn._id !== undefined ? (
              <div>
                <h3>Partner</h3>
                <p>Förnamn:  <span>{props.userLoggedIn.spouseFirstName}</span> </p>
                <p>Efternamn:  <span>{props.userLoggedIn.spouseLastName}</span></p>
                <p>Email:  <span>{props.userLoggedIn.spouseEmail}</span> </p>
                <p>Färg:  <input type="color"
                  className='color-input'
                  value={props.userLoggedIn.spouseColor}
                  readOnly />
                </p>
              </div>
            ) : (
              // Annars är det en spouse som loggat in och vill se OGuser som partner
              <div>
                <h3>Partner</h3>
                <p>Förnamn:  <span>{props.userLoggedIn.firstName}</span> </p>
                <p>Efternamn:  <span>{props.userLoggedIn.lastName}</span></p>
                <p>Email:  <span>{props.userLoggedIn.email}</span> </p>
                <p>Färg:  <input type="color"
                  className='color-input'
                  value={props.userLoggedIn.color}
                  readOnly />
                </p>
              </div>
            )}


          </div>

          <div className="children-settings-container">
            <h3>Barn</h3>
            {props.userLoggedIn.familyMembers.map((kid, i) => {
              // console.log('initialFormData', initialFormData);
              console.log('kid.childFirstName', kid.childFirstName);
              // console.log('formState.childColor', formState.childColor);
              // initialFormData.childColor = kid.childColor
              // console.log(initialFormData);
              return (
                <div className='children-settings'>
                  <label htmlFor="">Förnamn: </label>
                  <input type="text"
                    id={kid._id}
                    name={'childName' + i}
                    placeholder={kid.childFirstName}
                    value={contactInfo['childName' + i]}
                    onChange={(e) => handleChange(e, i, kid._id)}
                  // onChange={(e) => setChild({ ...child, childFirstName: e.target.value.trim() })}
                  // onChange={(e) =>
                  //   dispatch({
                  //     type: 'child-firstName',
                  //     field: e.currentTarget.name,
                  //     payload: e.target.value.trim()
                  //   })}
                  />
                  <label htmlFor="">Färg: </label>
                  <input type="color"
                    id={kid._id}
                    name={'childColor' + i}
                    className='color-input'
                    value={contactInfo['childColor' + i]}
                    onChange={(e) => handleChange(e, i, kid._id)}
                  // onChange={(e) => setChild({ ...child, childColor: e.target.value })}
                  // onChange={(e) =>
                  //   dispatch({
                  //     type: 'child-color',
                  //     field: e.currentTarget.name,
                  //     payload: e.target.value
                  //   })}
                  />
                </div>
              )
            })}
            <div className="submit-btn-container">
              <button
                className='submit-btn'
                type="submit"
              // onClick={(e) => handleSubmit(e)}
              >Uppdatera</button>
            </div>
          </div>
        </form>



        <CgClose className="close-btn" onClick={() => props.setTrigger(false)} />
      </div>
    </div>
  ) : '';
}
export default SettingsPopup
