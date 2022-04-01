import './header.css';

const Header = ({ userLoggedIn }) => {
  console.log('user logged in', userLoggedIn);
  return (
    <div className="header-container">
      <h1>Family Dashboard</h1>
      <p>{userLoggedIn}</p>
    </div>
  )
}

export default Header
