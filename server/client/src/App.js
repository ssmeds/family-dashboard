import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homework from './components/Homework/Homework'
import GroceryList from './components/GroceryList/GroceryList'
import Menu from './components/Menu/Menu'
import Remember from './components/Remember/Remember'
import Chatt from './components/Chatt/Chatt'
import Savings from './components/Savings/Savings'
import CalendarView from './components/Calendar/CalendarView'
import Todo from './components/Todo/Todo'
import Register from './components/Register/Register'
// import FirstSetup from './components/FirstSetup/FirstSetup'

import moment from 'moment/min/moment-with-locales'



function App() {
  const BACKEND_URL = 'https://familydashboard.herokuapp.com'
  const [userLoggedIn, setUserLoggedIn] = useState('');
  // ////console.log(data);
  const [homework, setHomework] = useState([]);
  const [remember, setRemember] = useState([]);
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState(moment())
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState('');
  // const [tasks, setTasks] = useState([])

  useEffect(() => {

    const fetchUsers = async () => {
      await fetch(`${BACKEND_URL}/api/users`)
        .then((response) => response.json())
        .then((data) => {
          console.log('userdata', data);
          let loggedInUser = data.find(user => user.isLoggedIn === true)
          console.log('loggedInUser', loggedInUser);
          setUsers(data)
          setUserLoggedIn(loggedInUser)

        })
    }
    fetchUsers()
  }, [])

  useEffect(() => {

    const getHomeworks = async () => {
      const homeworksFromServer = await fetchHomeworks()
      setHomework(homeworksFromServer)
    }

    getHomeworks()
  }, [])

  useEffect(() => {

    const getRemembers = async () => {
      const remembersFromServer = await fetchRemembers()
      setRemember(remembersFromServer)
    }

    getRemembers()
  }, [])

  useEffect(() => {

    const getTodos = async () => {
      const todosFromServer = await fetchTodos()
      setTodo(todosFromServer)
    }

    getTodos()
  }, [])

  //Fetch homeworks
  const fetchHomeworks = async () => {
    const res = await fetch(`${BACKEND_URL}/api/homeworks`)
    const data = await res.json()

    return data
  }

  //Fetch homework
  const fetchHomework = async (id) => {
    const res = await fetch(`${BACKEND_URL}/api/homeworks/${id}`)
    const data = await res.json()

    return data
  }


  //Add Homework
  const addHomework = (newHomework) => {
    // ////console.log(homework);
    const newHomeworkToPost = {
      subject: newHomework.subject,
      assignment: newHomework.assignment,
      complete: false
    }

    fetch(`${BACKEND_URL}/api/homeworks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHomeworkToPost)
    })
      .then(() => { console.log('new homework added'); })
    ////console.log('homework', homework);
    setHomework([...homework, newHomeworkToPost])

  }

  //Delete Homework
  const deleteHomework = (id) => {
    ////console.log(id);

    fetch(`${BACKEND_URL}/api/homeworks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          ////console.log(('Delete successful!'));
        }
        else {
          ////console.log('Delete unsuccessful!');
        }
        return res
      })
      .then(() => { console.log('Homework deleted'); })
    const newHomeworkList = homework.filter(item => item._id !== id);
    setHomework(newHomeworkList)

  }

  // //Update Homework
  // const updateHomework = (id) => {
  //   ////console.log("id", id);

  //   // ////console.log("completed", completed);

  //   // const updHomework = {
  //   //   complete: completed
  //   // }
  //   // ////console.log('updateHomework', updHomework);

  //   const found = homework.find(item => item._id === id)
  //   ////console.log('found', found);
  //   let complete;
  //   if (found.complete) {
  //     complete = true;
  //   } else {
  //     complete = false;
  //   }
  //   ////console.log('complete', complete);
  //   fetch(`${BACKEND_URL}/api/homeworks/${id}`, {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ complete: !complete })
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         ////console.log(('Update successful!'));
  //       }
  //       else {
  //         ////console.log('Update unsuccessful!');
  //       }
  //       return res
  //     })
  //     .then(() => { ////console.log('Homework updated'); })
  //   setHomework(homework.map(homework => homework._id === id ? { ...homework, complete: !homework.complete } : homework))

  // }

  //Toggle completed homework
  const toggleComplete = async (id) => {
    const homeworkToToggle = await fetchHomework(id);
    const toggleHomework = { ...homeworkToToggle, complete: !homeworkToToggle.complete }

    const res = await fetch(`${BACKEND_URL}/api/homeworks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toggleHomework)
    })

    const data = await res.json()

    setHomework(
      homework.map((homework) =>
        homework._id === id ? { ...homework, complete: data.complete } : homework))
  }


  //Fetch remembers
  const fetchRemembers = async () => {
    const res = await fetch(`${BACKEND_URL}/api/remembers`)
    const data = await res.json()

    return data
  }

  //Fetch remember
  const fetchRemember = async (id) => {
    const res = await fetch(`${BACKEND_URL}/api/remembers/${id}`)
    const data = await res.json()

    return data
  }

  //Add Remember
  const addRemember = (newRemember) => {
    // ////console.log(newRemember);
    let color;
    switch (newRemember.familyMember) {
      case 'Fredrik':
        color = '#071DE8';
        break;
      case 'Stina':
        color = '#FF91F8';
        break;
      case 'Johannes':
        color = '#4ED264';
        break;
      case 'Samuel':
        color = '#F9D570';
        break;
      case 'Sebastian':
        color = '#37BEF1';
        break;
      case 'Mathias':
        color = '#F2FF40';
        break;
      default:
        color = '#5593e4';

    }
    const newRememberToPost = {
      task: newRemember.task,
      date: newRemember.date,
      familyMember: newRemember.familyMember,
      color: color
    }

    fetch(`${BACKEND_URL}/api/remembers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRememberToPost)
    })
      .then(() => { console.log('new remember added'); })
    ////console.log('remember', remember);
    setRemember([...remember, newRememberToPost])
  }

  //Delete Remember
  const deleteRemember = (id) => {
    ////console.log(id);

    fetch(`${BACKEND_URL}/api/remembers/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          ////console.log(('Delete successful!'));
        }
        else {
          ////console.log('Delete unsuccessful!');
        }
        return res
      })
      .then(() => { console.log('Remember deleted'); })
    const newRememberList = remember.filter(item => item._id !== id);
    setRemember(newRememberList)

  }

  //Fetch todos
  const fetchTodos = async () => {
    const res = await fetch(`${BACKEND_URL}/api/todos`)
    const data = await res.json()
    ////console.log('data from fetchTodos', data);
    return data
  }

  //Fetch todo
  const fetchTodo = async (id) => {
    const res = await fetch(`${BACKEND_URL}/api/todos/${id}`)
    const data = await res.json()

    return data
  }

  //Add Todo
  const addTodo = (newTodo) => {
    ////console.log('newTodo: ', newTodo);
    const newTodoToPost = {
      task: newTodo.task,
      date: newTodo.date,
      complete: false
    }

    fetch(`${BACKEND_URL}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodoToPost)
    })
      .then(() => { console.log('new todo added'); })
    ////console.log('todo', todo);
    setTodo([...todo, newTodoToPost])

  }

  //Delete Homework
  const deleteTodo = (id) => {
    ////console.log(id);

    fetch(`${BACKEND_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          ////console.log(('Delete successful!'));
        }
        else {
          ////console.log('Delete unsuccessful!');
        }
        return res
      })
      .then(() => { console.log('Todo deleted'); })
    const newTodoList = todo.filter(item => item._id !== id);
    setTodo(newTodoList)

  }

  const addNewUser = (newUsersToPost) => {
    console.log('newUsers from Register before isloggedin', newUsersToPost);
    newUsersToPost.isLoggedIn = true;
    fetch(`${BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUsersToPost)
    })
      .then(() => { console.log('new users added'); })
    setUsers([...users, newUsersToPost])
    setIsLoggedIn(true)
    setUserLoggedIn(newUsersToPost)
  }

  return (
    <div className="App">
      <Register regNewFamily={addNewUser} />
      {isLoggedIn ? (
        <>
          <Header userLoggedIn={userLoggedIn} />
          <div className="upper-container">
            <Todo todos={todo} addTodo={addTodo} deleteTodo={deleteTodo} />
            <CalendarView value={value} onChange={setValue} onAdd={addTodo} todos={todo} />
            <GroceryList />
          </div>
          <div className="lower-container">
            <Chatt />
            <Remember remembers={remember} addRemember={addRemember} deleteRemember={deleteRemember} />
            <Homework homeworks={homework} addHomework={addHomework} deleteHomework={deleteHomework} toggleComplete={toggleComplete} />
            <Menu />
            <Savings />
          </div>

          <Footer />
        </>
      ) : ''}

    </div>
  );
}

export default App;
