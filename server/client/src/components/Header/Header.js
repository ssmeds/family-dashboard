import './header.css';

const Header = ({ userLoggedIn }) => {
  console.log('user logged in', userLoggedIn);
  userLoggedIn.map((user) => { return user.isLoggedIn ? console.log('Det finns en inloggad') : console.log('Det finns ingen inloggad') });
  // const userFamilyMembers = userLoggedIn.map(user => { return (<p>{user.FamilyMembers.childFirstName}</p>) });
  // userLoggedIn.map((user) => {
  //   return (<div>${user.firstName}</div>)
  // })

  // const users = userLoggedIn[0]
  return (
    <div className="header-container">
      <h1>Family Dashboard</h1>
      {/* {userFamilyMembers} */}

    </div>
  )
}

export default Header
