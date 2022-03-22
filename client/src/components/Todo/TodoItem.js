import { RiDeleteBin6Fill } from 'react-icons/ri'
// import { Temporal } from '@js-temporal/polyfill'
// import { Moment } from '@js-moment/moment'
// import moment from 'moment'
// import { format, parseISO } from 'date-fns'

const TodoItem = ({ todo, deleteTodo, updateTodo, toggleComplete }) => {
  // console.log('date', todo.date);
  // const unFormattedDate = todo.date;
  // const formattedDate = format(parseISO(unFormattedDate), 'MM-dd')
  // console.log('formattedDate', formattedDate);
  return (
    <div
      key={todo._id}
      className={`todo-item ${todo.complete && 'completed'}`}
      onDoubleClick={() => toggleComplete(todo._id)}>

      <h3 className="todo-task">{todo.task}<RiDeleteBin6Fill onClick={() => deleteTodo(todo._id)} style={{ cursor: 'pointer' }} /></h3>
      <p className="todo-date">{todo.date}</p>

    </div>
  )
}
export default TodoItem
