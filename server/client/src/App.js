import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homework from './components/Homework/Homework'
import GroceryList from './components/GroceryList/GroceryList'
import Menu from './components/Menu/Menu'
import Remember from './components/Remember/Remember'
// import Chatt from './components/Chatt/Chatt'
// import Savings from './components/Savings/Savings'
import CalendarView from './components/Calendar/CalendarView'
import Todo from './components/Todo/Todo'
import moment from 'moment/min/moment-with-locales'
import FrontPage from './components/FrontPage/FrontPage'


function App() {
  const BACKEND_URL = 'https://familydashboard.herokuapp.com'
  const [userLoggedIn, setUserLoggedIn] = useState('');
  // ////console.log(data);
  const [homework, setHomework] = useState([]);
  const [remember, setRemember] = useState([]);
  const [todo, setTodo] = useState([]);
  const [note, setNote] = useState([]);
  const [value, setValue] = useState(moment())
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState('');
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [groceryListItems, setGroceryListItems] = useState([{}]);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers();
      setUsers(usersFromServer);
    }
    getUsers()
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

  useEffect(() => {
    const getNotes = async () => {
      const notesFromServer = await fetchNotes()
      setNote(notesFromServer)
    }
    getNotes()
  }, [])

  useEffect(() => {
    const getWeeklyMenu = async () => {
      const weeklyMenuFromServer = await fetchWeeklyMenu()
      setWeeklyMenu(weeklyMenuFromServer)
    }
    getWeeklyMenu()
  }, [])

  useEffect(() => {
    const getGroceryListItems = async () => {
      const itemsFromServer = await fetchGroceryListItems()
      setGroceryListItems(itemsFromServer)
    }
    getGroceryListItems()
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
  const addHomework = async (newHomework) => {
    // console.log(newHomework);
    let newColor;
    let familyMemberFromHomework = newHomework.familyMember
    let children = [];
    userLoggedIn.familyMembers.map(familyMember => {
      children.push(familyMember)
    })
    let foundChild = children.find(person => person.childFirstName === familyMemberFromHomework)
    // console.log('foundChild', foundChild);
    if (userLoggedIn.firstName === familyMemberFromHomework) {
      newColor = userLoggedIn.color
    } else if (userLoggedIn.spouseFirstName === familyMemberFromHomework) {
      newColor = userLoggedIn.spouseColor
    } else {
      newColor = foundChild.childColor
    }
    if (newColor === '') {
      newColor = '#5593e4'
    }
    // console.log('color', newColor);
    let ownerId;
    if ('_id' in userLoggedIn) {
      ownerId = userLoggedIn._id;
    } else {
      ownerId = userLoggedIn.OGid
    }
    if (ownerId === undefined) {
      const res = await fetch(`${BACKEND_URL}/api/users`)
      const allUsers = await res.json()
      // console.log('allUsers', allUsers);
      let foundUser = allUsers.find(person => person.email === userLoggedIn.email || person.email === userLoggedIn.spouseEmail)
      ownerId = foundUser._id
      // console.log('foundUser', foundUser);
      // console.log('ownerId', ownerId);
    }
    // console.log('ownerId', ownerId);
    const newHomeworkToPost = {
      subject: newHomework.subject,
      assignment: newHomework.assignment,
      familyMember: newHomework.familyMember,
      color: newColor,
      owner: {
        id: ownerId,
      }
    }
    // console.log('newHomeworkToPost', newHomeworkToPost);
    fetch(`${BACKEND_URL}/api/homeworks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHomeworkToPost)
    })
      .then(() => {
        // console.log('new homework added');
      })
    ////console.log('homework', homework);
    setHomework([...homework, newHomeworkToPost])
  }

  //Delete Homework
  const deleteHomework = (id) => {
    // console.log(id);

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
      .then(() => {
        // console.log('Homework deleted');
      })
    const newHomeworkList = homework.filter(item => item._id !== id);
    setHomework(newHomeworkList)

  }

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
  const addRemember = async (newRemember) => {
    // console.log(newRemember);
    let color;
    let familyMemberFromRemember = newRemember.familyMember
    let children = [];
    userLoggedIn.familyMembers.map(familyMember => {
      children.push(familyMember)
    })
    let foundChild = children.find(person => person.childFirstName === familyMemberFromRemember)
    // console.log('foundChild', foundChild);
    if (userLoggedIn.firstName === familyMemberFromRemember) {
      color = userLoggedIn.color
    } else if (userLoggedIn.spouseFirstName === familyMemberFromRemember) {
      color = userLoggedIn.spouseColor
    } else {
      color = foundChild.childColor
    }
    if (color === '') {
      color = '#5593e4'
    }
    // console.log('color', color);
    let ownerId;

    if ('_id' in userLoggedIn) {
      ownerId = userLoggedIn._id;
    } else {
      ownerId = userLoggedIn.OGid
    }
    if (ownerId === undefined) {
    }
    if (ownerId === undefined) {
      const res = await fetch(`${BACKEND_URL}/api/users`)
      const allUsers = await res.json()
      // console.log('allUsers', allUsers);
      let foundUser = allUsers.find(person => person.email === userLoggedIn.email || person.email === userLoggedIn.spouseEmail)
      ownerId = foundUser._id
      // console.log('foundUser', foundUser);
      // console.log('ownerId', ownerId);
    }
    // console.log('ownerId', ownerId);
    const newRememberToPost = {
      task: newRemember.task,
      date: newRemember.date,
      familyMember: newRemember.familyMember,
      color: color,
      owner: {
        id: ownerId,
      }
    }

    fetch(`${BACKEND_URL}/api/remembers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRememberToPost)
    })
      .then(() => {
        // console.log('new remember added');
      })
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
      .then(() => {
        // console.log('Remember deleted');
      })
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
  const addTodo = async (newTodo) => {
    ////console.log('newTodo: ', newTodo);
    let ownerId;
    if ('_id' in userLoggedIn) {
      ownerId = userLoggedIn._id;
    } else {
      ownerId = userLoggedIn.OGid
    }
    // console.log('ownerId', ownerId);
    if (ownerId === undefined) {
      const res = await fetch(`${BACKEND_URL}/api/users`)
      const allUsers = await res.json()
      // console.log('allUsers', allUsers);
      let foundUser = allUsers.find(person => person.email === userLoggedIn.email || person.email === userLoggedIn.spouseEmail)
      ownerId = foundUser._id
      // console.log('foundUser', foundUser);
      // console.log('ownerId', ownerId);
    }
    const newTodoToPost = {
      task: newTodo.task,
      date: newTodo.date,
      complete: false,
      owner: {
        id: ownerId,
      }
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

  //Delete Todo
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

  //Fetch users
  const fetchUsers = async () => {
    const res = await fetch(`${BACKEND_URL}/api/users`)
    const data = await res.json()
    // console.log('users', data);
    return data
  }

  const addNewUser = (newUsersToPost) => {
    // console.log('newUsers from Register before isloggedin', newUsersToPost);
    newUsersToPost.isLoggedIn = true;
    fetch(`${BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUsersToPost)
    })
      .then(() => {
        // console.log('new users added');
      })
    setUsers([...users, newUsersToPost])
    setIsLoggedIn(true)
    setUserLoggedIn(newUsersToPost)
  }

  const setUserLoggedInAfterLogIn = (user) => {

    // console.log('user in setUserLoggedInAfterLogIn', user);
    // console.log('user._id', user._id);
    if (user._id !== undefined) {
      fetch(`${BACKEND_URL}/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isLoggedIn: true })
      })
        .then(() => {
          console.log('user logged in');
          setUsers([...users, user])
          setUserLoggedIn(user)
          setIsLoggedIn(true)
        })
      // setUsers([...users, user])
      // setIsLoggedIn(true)
      // setUserLoggedIn(user)
    } else {
      fetch(`${BACKEND_URL}/api/users/${user.OGid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spouseIsLoggedIn: true })
      })
        .then(() => {
          console.log('user logged in');
          setUsers([...users, user])
          setUserLoggedIn(user)
          setIsLoggedIn(true)
        })
      // setUsers([...users, user])
      // setIsLoggedIn(true)
      // setUserLoggedIn(user)
    }
    // setUsers([...users, user])
    // setUserLoggedIn(user)
    // setIsLoggedIn(true)

  }

  const logOutUser = (user) => {
    // console.log('App.js logga ut usern', user);

    if (user._id !== undefined) {
      fetch(`${BACKEND_URL}/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isLoggedIn: false })
      })
        .then(() => {
          // console.log('user logged out');
          setUsers([...users, user])
          setIsLoggedIn(false)
          setUserLoggedIn('')
        })
    } else {
      let OGuser = users.find(person => person._id === user.OGid)
      // console.log('OGuser:', OGuser);
      fetch(`${BACKEND_URL}/api/users/${OGuser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spouseIsLoggedIn: false })
      })
        .then(() => {
          // console.log('user logged out');
          setUsers([...users, user])
          setIsLoggedIn(false)
          setUserLoggedIn('')
        })
    }
  }

  const addInvitedToDB = async (invited) => {
    // console.log('invited to save to db', invited);

    const usersFromServer = await fetchUsers();
    const foundOGPartner = usersFromServer.find(user => user.spouseEmail === invited.spouseEmail);
    // console.log('foundOGPartner i App', foundOGPartner);
    let update = {
      spouseFirstName: foundOGPartner.spouseFirstName,
      spouseLastName: foundOGPartner.spouseLastName,
      spouseEmail: invited.spouseEmail,
      spousePassword: invited.spousePassword,
      spouseColor: invited.spouseColor,
      spouseIsLoggedIn: true
    }
    let spouseToSaveToState = {
      spouseFirstName: foundOGPartner.spouseFirstName,
      spouseLastName: foundOGPartner.spouseLastName,
      spouseEmail: invited.spouseEmail,
      spousePassword: invited.spousePassword,
      spouseColor: invited.spouseColor,
      familyMembers: foundOGPartner.familyMembers,
      OGid: foundOGPartner._id,
      firstName: foundOGPartner.firstName,
      lastName: foundOGPartner.lastName,
      email: foundOGPartner.email,
      color: foundOGPartner.color
    }
    setUserLoggedInAfterLogIn(spouseToSaveToState)
    setUserLoggedIn(spouseToSaveToState)
    setIsLoggedIn(true)

    fetch(`${BACKEND_URL}/api/users/${foundOGPartner._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    })
      .then(() => {
        // console.log('user added spouse info');

      })
  }

  // I have problems with this code. I can't seem to find I way to structure the updates so that it matches the structure in the db
  // I will sort this out in the future
  const updateUserInformation = (updates) => {
    // console.log('updates', updates);

    if (updates.color === userLoggedIn.color) {
      delete updates.color
    }
    // console.log('updates after remove same color', updates);

    let familyMembersArray = [];
    Object.keys(updates).map(function (k) {
      // console.log("key with value: " + k + " = " + updates[k])
      // console.log(`'childName${k}'`);
      for (let i = 0; i < 10; i++) {
        // console.log(`'childName${i}'`);
        switch (k) {
          case `childName${i}`:
            familyMembersArray.push({
              childFirstName: updates[k]
            })
            break;
          case `childColor${i}`:
            familyMembersArray.push({
              childColor: updates[k]
            })
            break;
          default:
            break;
        }
      }
    })
    // console.log('familyMembersArray', familyMembersArray);
    // let newChildObject;
    Object.entries(updates).forEach(([key, value], i) => {
      // console.log(`${key}: ${value} and index: ${i}`)
      userLoggedIn.familyMembers.map((child, i) => {
      })
    })

    // console.log('familyMembersArray', familyMembersArray);
    familyMembersArray.map((info, i) => {
      if ('childFirstName' in info) {
        // console.log('childFirstName exists', info, i);
      } else {
        // console.log("childFirstName doesn't exist", info, i);
      }
    })

    fetch(`${BACKEND_URL}/api/users/${userLoggedIn._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })
      .then(() => {
        // console.log('user changed info');
      })
  }

  //Fetch MenuItems
  const fetchWeeklyMenu = async () => {
    const res = await fetch(`${BACKEND_URL}/api/weeklymenus`)
    const data = await res.json()
    // console.log('weekly menus', data);
    return data
  }


  //Add Weekly Menu
  const addWeeklyMenu = async (weekMenu, weekNr) => {
    // console.log('this weeks menu and weeknr', weekMenu, weekNr);
    let ownerId;
    if ('_id' in userLoggedIn) {
      ownerId = userLoggedIn._id;
    } else {
      ownerId = userLoggedIn.OGid
    }
    // console.log('ownerId', ownerId);
    if (ownerId === undefined) {
      const res = await fetch(`${BACKEND_URL}/api/users`)
      const allUsers = await res.json()
      // console.log('allUsers', allUsers);
      let foundUser = allUsers.find(person => person.email === userLoggedIn.email || person.email === userLoggedIn.spouseEmail)
      ownerId = foundUser._id
      // console.log('foundUser', foundUser);
      // console.log('ownerId', ownerId);
    }
    const weekMenuToSaveToDB = {
      weekNr,
      weekMenu,
      owner: {
        id: ownerId,
      }
    }
    // console.log('weekMenuToSaveToDB', weekMenuToSaveToDB);
    fetch(`${BACKEND_URL}/api/weeklymenus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weekMenuToSaveToDB)
    })
      .then(() => {
        // console.log('new weeks menu added');
        setWeeklyMenu([...weeklyMenu, weekMenuToSaveToDB])
      })

  }

  //Fetch Notes
  const fetchNotes = async () => {
    const res = await fetch(`${BACKEND_URL}/api/notes`)
    const data = await res.json()
    ////console.log('data from fetchTodos', data);
    return data
  }

  //Fetch Note
  const fetchNote = async (id) => {
    const res = await fetch(`${BACKEND_URL}/api/notes/${id}`)
    const data = await res.json()

    return data
  }

  //Add Calendar Note
  const addNote = async (newNote) => {
    ////console.log('newNote: ', newNote);
    let ownerId;
    if ('_id' in userLoggedIn) {
      ownerId = userLoggedIn._id;
    } else {
      ownerId = userLoggedIn.OGid
    }
    // console.log('ownerId', ownerId);
    if (ownerId === undefined) {
      const res = await fetch(`${BACKEND_URL}/api/users`)
      const allUsers = await res.json()
      // console.log('allUsers', allUsers);
      let foundUser = allUsers.find(person => person.email === userLoggedIn.email || person.email === userLoggedIn.spouseEmail)
      ownerId = foundUser._id
      // console.log('foundUser', foundUser);
      // console.log('ownerId', ownerId);
    }
    const newNoteToPost = {
      task: newNote.task,
      date: newNote.date,
      owner: {
        id: ownerId,
      }
    }

    fetch(`${BACKEND_URL}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNoteToPost)
    })
      .then(() => {
        // console.log('new note added');
      })
    ////console.log('todo', todo);
    setNote([...note, newNoteToPost])

  }

  //Delete Calendar Note
  const deleteNote = (id) => {
    ////console.log(id);

    fetch(`${BACKEND_URL}/api/notes/${id}`, {
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
      .then(() => {
        // console.log('Note deleted');
      })
    const newNoteList = note.filter(item => item._id !== id);
    setNote(newNoteList)

  }

  //Fetch groceryListItems
  const fetchGroceryListItems = async () => {
    const res = await fetch(`${BACKEND_URL}/api/grocerylistitems`)
    const data = await res.json()

    return data
  }

  //Add Grocerylist item
  const addGroceryListItem = async (newItem) => {
    // console.log('newItem: ', newItem);
    let ownerId;
    if ('_id' in userLoggedIn) {
      ownerId = userLoggedIn._id;
    } else {
      ownerId = userLoggedIn.OGid
    }
    // console.log('ownerId', ownerId);
    if (ownerId === undefined) {
      const res = await fetch(`${BACKEND_URL}/api/users`)
      const allUsers = await res.json()
      // console.log('allUsers', allUsers);
      let foundUser = allUsers.find(person => person.email === userLoggedIn.email || person.email === userLoggedIn.spouseEmail)
      ownerId = foundUser._id
      // console.log('foundUser', foundUser);
      // console.log('ownerId', ownerId);
    }
    const newItemToPost = {
      item: newItem.item,
      quantity: newItem.quantity,
      complete: false,
      owner: {
        id: ownerId,
      }
    }

    fetch(`${BACKEND_URL}/api/grocerylistitems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItemToPost)
    })
      .then(() => {
        // console.log('new groceryList item added');
      })
    setGroceryListItems([...groceryListItems, newItemToPost])
    ////console.log('todo', todo);

  }


  //Toggle completed grocerylistitem
  const toggleCompletedGroceryListItem = async (id) => {
    const itemToToggle = await fetchGroceryListItems(id);
    const toggleItem = { ...itemToToggle, complete: !itemToToggle.complete }

    const res = await fetch(`${BACKEND_URL}/api/grocerylistitems/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toggleItem)
    })

    const data = await res.json()

  }

  //Delete GroceryListItem
  const deleteGroceryListItem = async (id) => {

    // console.log('id of list item to delete:', id);

    //The id's in db starts with 625...
    if (!id.startsWith('625')) {
      // console.log('groceryListItem', groceryListItems);
      fetch(`${BACKEND_URL}/api/grocerylistitems`)
        .then(response => response.json())
        .then(data => {
          // console.log('data', data);
          // console.log('id', id);

          let foundItem = data.find(listItem => listItem.item === id);
          // console.log('foundItemId:', foundItem);
          id = foundItem._id
          fetch(`${BACKEND_URL}/api/grocerylistitems/${id}`, {
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
            .then(() => {
              // console.log('grocerylistitem deleted');
            })

        })
    } else {
      fetch(`${BACKEND_URL}/api/grocerylistitems/${id}`, {
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
        .then(() => {
          // console.log('grocerylistitem deleted');

        })
    }
  }

  //Update GroceryListItem
  const updateQuantity = async (changedItem) => {
    // console.log('changedItem', changedItem);
    let id;
    if (!changedItem.hasOwnProperty('_id')) {
      let allItems = await fetchGroceryListItems()
      const foundName = allItems.find(item => item.item === changedItem.item)
      id = foundName._id
      // console.log('found by name', foundName);
      // console.log('groceryListItems', groceryListItems);
    } else {
      const found = groceryListItems.find(item => item._id === changedItem._id)
      id = found._id
      // console.log('found by id', found);
    }

    // console.log('id', id);
    fetch(`${BACKEND_URL}/api/grocerylistitems/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: changedItem.quantity })
    })

      .then(res => {
        if (res.ok) {
          // console.log(('Update successful!'));
        }
        else {
          // console.log('Update unsuccessful!');
        }
        return res
      })
      .then((data) => {
        // console.log('Quantity updated', data);
      })
  }

  return (
    <div className="App">
      {!isLoggedIn ? (
        <FrontPage setUserLoggedInAfterLogIn={setUserLoggedInAfterLogIn} regNewFamily={addNewUser} addInvitedToDB={addInvitedToDB} setUserLoggedIn={setUserLoggedIn} />) :
        (
          <>
            <Header userLoggedIn={userLoggedIn} logOutUser={logOutUser} updateUserInformation={updateUserInformation} />
            <div className="upper-container">
              <Todo userLoggedIn={userLoggedIn} todos={todo} addTodo={addTodo} deleteTodo={deleteTodo} />
              <CalendarView userLoggedIn={userLoggedIn} value={value} onChange={setValue} addNote={addNote} notes={note} />
              <GroceryList userLoggedIn={userLoggedIn} addGroceryListItem={addGroceryListItem} groceryListItems={groceryListItems} setGroceryListItems={setGroceryListItems} toggleCompletedGroceryListItem={toggleCompletedGroceryListItem} deleteGroceryListItem={deleteGroceryListItem} updateQuantity={updateQuantity} />
            </div>
            <div className="lower-container">
              {/* <Chatt userLoggedIn={userLoggedIn} /> */}
              <Remember userLoggedIn={userLoggedIn} remembers={remember} addRemember={addRemember} deleteRemember={deleteRemember} />
              <Homework userLoggedIn={userLoggedIn} homeworks={homework} addHomework={addHomework} deleteHomework={deleteHomework} toggleComplete={toggleComplete} />
              <Menu userLoggedIn={userLoggedIn} addWeeklyMenu={addWeeklyMenu} recipes={recipes} weeklyMenu={weeklyMenu} fetchWeeklyMenu={fetchWeeklyMenu} />
              {/* <Savings userLoggedIn={userLoggedIn} /> */}
            </div>
            <Footer />
          </>
        )}
    </div>
  );
}

export default App;
