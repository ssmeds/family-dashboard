import { useState } from 'react'
import './todo.css'
import Week from '.././Week/Week'

import TodoItem from './TodoItem'

const Todo = ({ todos, addTodo, deleteTodo, updateTodo, toggleComplete, userLoggedIn }) => {
  const todo = todos;
  console.log('todo', todo);
  let formattedDatesTodos;
  let rightOwnerTodos = [];
  todo.map(todoItem => {
    if (todoItem.owner.id === userLoggedIn._id) {
      rightOwnerTodos.push(todoItem)
      formattedDatesTodos = rightOwnerTodos.map(item => {
        // console.log('nytt datum', item.date);
        if (item.date !== null) {
          return { ...item, date: item.date.slice(0, 10) }
        } else {
          return { ...item, date: '' }
        }

      })
      // console.log(props);
      rightOwnerTodos.sort((a, b) => {
        let da = new Date(a.date),
          db = new Date(b.date);
        return da - db;
      })
    }
  })


  // console.log('sorted todos', todo);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  // const [complete, setComplete] = useState(false);

  const handleSaveClick = (e) => {
    e.preventDefault();
    // console.log('Nu har nån klickat på sparaknappen!');
    // console.log('Ämne', task);
    // console.log('Datum', date);
    addTodo({ task, date })

    setDate('')
    setTask('')
    document.querySelector('#form-select').reset()
  }

  return (
    <div className="todo-container card">
      <div className="card-header todo-header"><h1>Todos</h1>
        <Week /></div>

      <div className='card-list todo-list'>
        <>
          {rightOwnerTodos.length !== 0 ?
            formattedDatesTodos.map((todo, i) => (
              <TodoItem
                key={todo._id ? todo._id : i}
                todo={todo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
              />
            )) : ''
          }

        </>
      </div>

      <form onSubmit={handleSaveClick} id='form-select'>
        <input
          type="text"
          name=""
          id=""
          placeholder="Fyll i din todo här..."
          value={task} onChange={(e) => { setTask(e.target.value) }}
        />
        <input
          type="date"
          name=""
          id="todo-date"
          value={date}
          onChange={(e) => { setDate(e.target.value) }}
        />
        <button>Spara</button>
      </form>
    </div>
  )
}
export default Todo
