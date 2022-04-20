import { RiDeleteBin6Fill } from 'react-icons/ri'
import { hex_is_light } from '../../helperFunctions/colorCheck'

const HomeworkItem = ({ homeworks, deleteHomework, updateHomework, toggleComplete, userLoggedIn }) => {
  console.log('homework in homeworkItem', homeworks);
  console.log('userLoggedIn', userLoggedIn);
  let userHomeworkList = []
  if (homeworks !== undefined) {
    homeworks.map(homework => {
      if (userLoggedIn._id === homework.owner.id || userLoggedIn.OGid === homework.owner.id) {
        userHomeworkList.push(homework);
      }
    })
  }
  console.log('userHomeworkList', userHomeworkList);
  let color;
  return (
    <>
      {userHomeworkList.map((homework, i) => {
        console.log('homework.color', homework.color);
        if (homework.color !== undefined) { color = hex_is_light(homework.color) }
        return (
          <div
            key={homework._id}
            style={color ? { backgroundColor: homework.color } : { backgroundColor: homework.color, color: 'white' }}
            className={`homework-item ${homework.complete && 'completed'}`}
            onDoubleClick={() => toggleComplete(homework._id)}>
            <h3 className="homework-subject" >{homework.subject}<RiDeleteBin6Fill onClick={() => deleteHomework(homework._id)} style={{ cursor: 'pointer' }} /></h3>
            <p className="homework-assignment">{homework.assignment}</p>
          </div>
        )
      })}
    </>
  )
}
export default HomeworkItem
