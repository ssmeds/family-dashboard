import { RiDeleteBin6Fill } from 'react-icons/ri'
import { hex_is_light } from '../../helperFunctions/colorCheck'

const RememberItem = ({ remembers, deleteRemember }) => {
  console.log("remembers from Remember.js", remembers);
  return (
    <>
      {remembers.map((item, i) => {
        console.log('item', item);
        let color = hex_is_light(item.color)
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
