import { RiDeleteBin6Fill } from 'react-icons/ri'
import { hex_is_light } from '../../helperFunctions/colorCheck'

const RememberItem = ({ remembers, deleteRemember, userLoggedIn }) => {
  console.log("remembers from Remember.js", remembers);
  console.log("userLoggedIn", userLoggedIn);

  let usersRemembersList = []
  remembers.map(item => {
    if (userLoggedIn._id === item.owner.id || userLoggedIn.OGid === item.owner.id) {
      usersRemembersList.push(item)
    }
  })
  // let foundColor = remembers.find(item => )
  console.log('usersRemembersList', usersRemembersList);
  let color;
  return (
    <>
      {usersRemembersList.map((item, i) => {
        console.log('item.color', item.color);
        if (item.color !== undefined) { color = hex_is_light(item.color) }
        return (
          <div key={i} className="remember-item" style={color ? { backgroundColor: item.color } : { backgroundColor: item.color, color: '#fff' }}>
            <p>{item.task}</p>
            <RiDeleteBin6Fill onClick={() => deleteRemember(item._id)} style={{ cursor: 'pointer', color: '#000' }} />
          </div>
        )
      })}
    </>
  )
}
export default RememberItem
