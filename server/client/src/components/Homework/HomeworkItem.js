import { RiDeleteBin6Fill } from 'react-icons/ri'
import { hex_is_light } from '../../helperFunctions/colorCheck'

const HomeworkItem = ({ homework, deleteHomework, updateHomework, toggleComplete, userLoggedIn }) => {
  console.log('homework in homeworkItem', homework);
  let color;
  if (homework.color !== undefined) { color = hex_is_light(homework.color) }
  return (
    <div
      key={homework._id}
      style={color ? { backgroundColor: homework.color } : { backgroundColor: homework.color, color: '#fff' }}
      className={`homework-item ${homework.complete && 'completed'}`}
      onDoubleClick={() => toggleComplete(homework._id)}>

      <h3 className="homework-subject" >{homework.subject}<RiDeleteBin6Fill onClick={() => deleteHomework(homework._id)} style={{ cursor: 'pointer' }} /></h3>
      <p className="homework-assignment">{homework.assignment}</p>

    </div>
  )
}
export default HomeworkItem
