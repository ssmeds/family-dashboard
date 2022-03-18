import { RiDeleteBin6Fill } from 'react-icons/ri'

const HomeworkItem = ({ homework, deleteHomework, updateHomework, toggleComplete }) => {
  return (
    <div
      key={homework._id}
      className={`homework-item ${homework.complete && 'completed'}`}
      onDoubleClick={() => toggleComplete(homework._id)}>

      <h3 className="homework-subject">{homework.subject}<RiDeleteBin6Fill onClick={() => deleteHomework(homework._id)} style={{ cursor: 'pointer' }} /></h3>
      <p className="homework-assignment">{homework.assignment}</p>

    </div>
  )
}
export default HomeworkItem
