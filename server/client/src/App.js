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
import LogIn from './components/LogIn/LogIn'

import moment from 'moment/min/moment-with-locales'
import FrontPage from './components/FrontPage/FrontPage'
import { set } from 'date-fns/esm'



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

  // const [groceryListItem, setGroceryListItem] = useState([]);
  const [groceryListItems, setGroceryListItems] = useState([{
    // item: '',
    // quantity: 1,
    // complete: false,
  }]);
  // const [tasks, setTasks] = useState([])

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
      // console.log('homeworksFromServer', homeworksFromServer);
      // let allHomeworksOwnedByCurrentUser = []
      // homeworksFromServer.map(homework => {
      //   if (homework.owner.id === userLoggedIn._id) {
      //     allHomeworksOwnedByCurrentUser.push(homework)
      //   }
      // })

      // console.log('allHomeworksOwnedByCurrentUser', allHomeworksOwnedByCurrentUser);
      // // setHomework(homeworksFromServer)
      // setHomework(allHomeworksOwnedByCurrentUser)
      setHomework(homeworksFromServer)
    }

    getHomeworks()
  }, [])

  useEffect(() => {

    const getRemembers = async () => {
      const remembersFromServer = await fetchRemembers()
      // console.log('remembersFromServer', remembersFromServer);
      // let allRemembersOwnedByCurrentUser = []
      // remembersFromServer.map(remember => {
      //   if (remember.owner.id === userLoggedIn._id) {
      //     allRemembersOwnedByCurrentUser.push(remember)
      //   }
      // })

      // console.log('allRemembersOwnedByCurrentUser', allRemembersOwnedByCurrentUser);
      // setRemember(allRemembersOwnedByCurrentUser)
      setRemember(remembersFromServer)
    }

    getRemembers()
  }, [])

  useEffect(() => {

    const getTodos = async () => {
      const todosFromServer = await fetchTodos()
      // let allTodosOwnedByCurrentUser = []
      // todosFromServer.map(todo => {
      //   if (todo.owner.id === userLoggedIn._id) {
      //     allTodosOwnedByCurrentUser.push(todo)
      //   }
      // })

      // console.log('allTodosOwnedByCurrentUser', allTodosOwnedByCurrentUser);
      // setTodo(allTodosOwnedByCurrentUser)
      setTodo(todosFromServer)
    }

    getTodos()
  }, [])

  useEffect(() => {

    const getNotes = async () => {
      const notesFromServer = await fetchNotes()
      // let allNotesOwnedByCurrentUser = []
      // notesFromServer.map(note => {
      //   if (note.owner.id === userLoggedIn._id) {
      //     allNotesOwnedByCurrentUser.push(note)
      //   }
      // })

      // console.log('allNotesOwnedByCurrentUser', allNotesOwnedByCurrentUser);
      // setNote(allNotesOwnedByCurrentUser)
      setNote(notesFromServer)
    }

    getNotes()
  }, [])

  useEffect(() => {

    const getWeeklyMenu = async () => {
      const weeklyMenuFromServer = await fetchWeeklyMenu()
      // let allWeeklyMenusOwnedByCurrentUser = []
      // weeklyMenuFromServer.map(menu => {
      //   if (menu.owner.id === userLoggedIn._id) {
      //     allWeeklyMenusOwnedByCurrentUser.push(menu)
      //   }
      // })

      // console.log('allWeeklyMenusOwnedByCurrentUser', allWeeklyMenusOwnedByCurrentUser);
      // setWeeklyMenu(allWeeklyMenusOwnedByCurrentUser)
      setWeeklyMenu(weeklyMenuFromServer)
    }

    getWeeklyMenu()
  }, [])

  useEffect(() => {

    const getGroceryListItems = async () => {
      const itemsFromServer = await fetchGroceryListItems()
      // let allItemsOwnedByCurrentUser = []
      // itemsFromServer.map(item => {
      //   if (item.owner.id === userLoggedIn._id) {
      //     allItemsOwnedByCurrentUser.push(item)
      //   }
      // })

      // console.log('allItemsOwnedByCurrentUser', allItemsOwnedByCurrentUser);
      // setGroceryListItems(allItemsOwnedByCurrentUser)
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
  const addHomework = (newHomework) => {

    console.log(newHomework);
    let color;
    let familyMemberFromHomework = newHomework.familyMember
    let children = [];
    userLoggedIn.familyMembers.map(familyMember => {
      children.push(familyMember)
    })
    let foundChild = children.find(person => person.childFirstName === familyMemberFromHomework)
    console.log('foundChild', foundChild);
    if (userLoggedIn.firstName === familyMemberFromHomework) {
      color = userLoggedIn.color
    } else if (userLoggedIn.spouseFirstName === familyMemberFromHomework) {
      color = userLoggedIn.spouseColor
    } else {
      color = foundChild.childColor
    }
    if (color === '') {
      color = '#5593e4'
    }
    console.log('color', color);
    const newHomeworkToPost = {
      subject: newHomework.subject,
      assignment: newHomework.assignment,
      familyMember: newHomework.familyMember,
      color: color,
      owner: {
        id: userLoggedIn._id,
      }
    }

    fetch(`${BACKEND_URL}/api/homeworks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHomeworkToPost)
    })
      .then(() => { console.log('new homework added'); })
    ////console.log('homework', homework);
    setHomework([...homework, newHomeworkToPost])

    // // ////console.log(homework);
    // const newHomeworkToPost = {
    //   subject: newHomework.subject,
    //   assignment: newHomework.assignment,
    //   complete: false,
    //   owner: {
    //     id: userLoggedIn._id,
    //     // firstName: userLoggedIn.firstName,
    //     // lastName: userLoggedIn.lastName,
    //     // email: userLoggedIn.email,
    //     // color: userLoggedIn.color,
    //     // familyMembers: userLoggedIn.familyMembers,
    //     // spouse: userLoggedIn.spouse,
    //   }
    // }
    // console.log('newHomeworkToPost', newHomeworkToPost);
    // fetch(`${BACKEND_URL}/api/homeworks`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newHomeworkToPost)
    // })
    //   .then(() => { console.log('new homework added'); })
    // ////console.log('homework', homework);
    // setHomework([...homework, newHomeworkToPost])

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
    console.log(newRemember);
    let color;
    let familyMemberFromRemember = newRemember.familyMember
    let children = [];
    userLoggedIn.familyMembers.map(familyMember => {
      children.push(familyMember)
    })
    let foundChild = children.find(person => person.childFirstName === familyMemberFromRemember)
    console.log('foundChild', foundChild);
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
    console.log('color', color);
    const newRememberToPost = {
      task: newRemember.task,
      date: newRemember.date,
      familyMember: newRemember.familyMember,
      color: color,
      owner: {
        id: userLoggedIn._id,
        // firstName: userLoggedIn.firstName,
        // lastName: userLoggedIn.lastName,
        // email: userLoggedIn.email,
        // color: userLoggedIn.color,
        // familyMembers: userLoggedIn.familyMembers,
        // spouse: userLoggedIn.spouse,
      }
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
      complete: false,
      owner: {
        id: userLoggedIn._id,
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
    console.log('users', data);
    return data
  }

  // const fetchUsers = async () => {
  //   await fetch(`${BACKEND_URL}/api/users`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('userdata', data);
  //       let loggedInUser = data.find(user => user.isLoggedIn === true)
  //       console.log('loggedInUser', loggedInUser);
  //       setUsers(data)
  //       // setUserLoggedIn(loggedInUser)

  //     })
  // }
  // fetchUsers()

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

  // const logOutUserFromDB = (user) => {
  //   console.log('user to logout', user);
  //   // user.isLoggedIn = false;

  //   const foundUser = users.find(person => person.email === user.email && person.password === user.password)
  //   // foundUser.isLoggedIn = false;
  //   console.log('foundUser', foundUser);



  //   fetch(`${BACKEND_URL}/api/users/${foundUser._id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ isLoggedIn: false })
  //   })
  //     .then(() => { console.log('user logged out'); })
  //   setUsers([...users, user])
  // }

  const setUserLoggedInAfterLogIn = (user, invited) => {

    console.log('user in setUserLoggedInAfterLogIn', user);
    console.log('invited in setUserLoggedInAfterLogIn', invited);
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
          // setUserLoggedIn(user)
          setIsLoggedIn(true)
        })
    } else {
      setUsers([...users, user])
      // setUserLoggedIn(user)
      setIsLoggedIn(true)
    }
  }

  const logOutUser = (user) => {
    console.log('App.js logga ut usern', user);

    if (user._id !== undefined) {
      fetch(`${BACKEND_URL}/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isLoggedIn: false })
      })
        .then(() => {
          console.log('user logged out');
          setUsers([...users, user])
          setUserLoggedIn('')
          setIsLoggedIn(false)
        })
    } else {
      let OGuser = users.find(person => person.spouseEmail === user.email)
      console.log('OGuser:', OGuser);
      fetch(`${BACKEND_URL}/api/users/${OGuser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spouseIsLoggedIn: false })
      })
        .then(() => {
          console.log('user logged out');
          setUsers([...users, user])
          setUserLoggedIn('')
          setIsLoggedIn(false)
        })
    }

    // setUserLoggedIn('')
    // setIsLoggedIn(false)
    // logOutUserFromDB(user)
  }

  const addInvitedToDB = async (invited) => {
    console.log('invited to save to db', invited);
    // const getObject = (obj, str) => {
    //   let result;
    //   if (!obj || typeof obj !== 'object') return;
    //   Object.values(obj).some((v) => {
    //     if (v === str) return result = obj;
    //     return result = getObject(v, str);
    //   })
    //   return result;
    // }



    const usersFromServer = await fetchUsers();
    // const fetchUsers = async () => {
    //   await fetch(`${BACKEND_URL}/api/users`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log('userdata', data);
    //       // const findEmail = invited.email;
    const foundOGPartner = usersFromServer.find(user => user.spouseEmail === invited.spouseEmail);
    console.log('foundOGPartner i App', foundOGPartner);
    let update = {
      spouseFirstName: foundOGPartner.spouseFirstName,
      spouseLastName: foundOGPartner.spouseLastName,
      spouseEmail: invited.spouseEmail,
      spousePassword: invited.spousePassword,
      spouseColor: invited.spouseColor,
      spouseIsLoggedIn: true
    }
    setUserLoggedInAfterLogIn(update, invited)
    setUserLoggedIn(update)
    setIsLoggedIn(true)
    // data.map(user => {
    //   console.log('user', user);
    //   let foundSpouses = user.spouse;
    //   if (foundSpouses !== undefined) {
    //     foundSpouses.map(info => {
    //       if (info.spouseEmail === findEmail) {
    //         // console.log('found it', info);
    //         // console.log('found user', user);
    //         let foundUser = user
    //         let spousePatch = {
    //           spouseFirstName: foundUser.spouse[0].spouseFirstName,
    //           spouseLastName: foundUser.spouse[0].spouseLastName,
    //           spouseEmail: invited.email,
    //           spousePassword: invited.password,
    //           spouseColor: invited.color
    //         }
    //         // console.log('spousePatch', spousePatch);
    fetch(`${BACKEND_URL}/api/users/${foundOGPartner._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    })
      .then(() => {
        console.log('user added spouse info');
        // setUsers([...users, update])
        //   // console.log('foundFamily', foundFamily);
        // setUsers(data)
        // setUserLoggedIn(update)
        // setIsLoggedIn(true)
        // setUserLoggedInAfterLogIn(update, invited)
      })
    //       }
    //     })
    //   }
    // })



    // })
    // }
    // fetchUsers()
    // setUsers([...users, update])
    //   // console.log('foundFamily', foundFamily);
    // setUsers(data)
    // setUserLoggedIn(update)
    // setIsLoggedIn(true)
    // setUsers([...users, invited])
    // setIsLoggedIn(true)
    // setUserLoggedIn(invited)
  }

  const updateUserInformation = (updates) => {
    console.log('updates', updates);

    if (updates.color === userLoggedIn.color) {
      delete updates.color
    }
    console.log('updates after remove same color', updates);

    let familyMembersArray = [];
    Object.keys(updates).map(function (k) {
      console.log("key with value: " + k + " = " + updates[k])
      // console.log(`'childName${k}'`);
      for (let i = 0; i < 10; i++) {
        console.log(`'childName${i}'`);
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

      // if (k === 'childName0') {
      //   familyMembersArray.push({
      //     childFirstName: updates[k]
      //   })
      // }
    })
    console.log('familyMembersArray', familyMembersArray);
    let newChildObject;
    Object.entries(updates).forEach(([key, value], i) => {
      console.log(`${key}: ${value} and index: ${i}`)
      userLoggedIn.familyMembers.map((child, i) => {
        // let updatesArray = Object.entries(updates)
        // updatesArray.map((info, i) => {
        //   console.log('info and i', info, i);
        // })
        // console.log('updatesArray', updatesArray);
        // Object.entries(updates).forEach(([key, value], i) => {
        //   console.log(`${key}: ${value} and index: ${i}`)



        // if (updatesArray.includes(child._id)) {
        //   newChildObject = {
        //     _id: child._id,
        //     childFirstName: updatesArray[]
        //   }


        //   //   // console.log('matchande id', child._id);
        //   //   // console.log(Object.keys(updates).length)
        //   //   // // updates.`childName${i}` = 'childFirstName'
        //   //   // let placesInUpdates = Object.keys(updates).length - 1
        //   //   // 
        // }
      })

    })

    // familyMembersArray.map((child, i) => {

    //   familyMembersArray[i].childColor = familyMembersArray[i + 1].childColor
    //   // familyMembersArray.splice(i, 1)

    // })
    console.log('familyMembersArray', familyMembersArray);
    familyMembersArray.map((info, i) => {
      if ('childFirstName' in info) {
        console.log('childFirstName exists', info, i);
      } else {
        console.log("childFirstName doesn't exist", info, i);
      }
    })
    // let keys = Object.keys(updates).filter(k => updates[k] === value);
    // console.log('keys', keys);
    // for (let i = 0; i < 9; i++) {
    //   console.log(updates.childName);
    //   if (`${updates.childName}${i}` !== undefined || `${updates.childColor}${i}` !== undefined) {
    //     familyMembersArray.push({
    //       childFirstName: `${updates.childName}${i}`,
    //       childColor: `${updates.childColor}${i}`
    //     })
    //   }
    //   console.log('familyMembersArray', familyMembersArray);
    // }

    // for (const [key, value] of Object.entries(updates)) {
    //   if (Object.keys(updates).some(i => { return i.endsWith('0') })) {
    //     console.log(`${key}: ${value}`);
    //   }
    // }
    // let key;
    // for (let [key, value] in updates) {
    //   if (key === 'childName0') {
    //     familyMembersArray.push({ childFirstName: value })
    //   } else if ([key].includes('Color')) {
    //     console.log('includes color', key);
    //     familyMembersArray.push({ childColor: value })
    //   }
    //   console.log('familyMembersArray', familyMembersArray);
    // }
    // console.log(key, updates[key]);
    // }

    fetch(`${BACKEND_URL}/api/users/${userLoggedIn._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })
      .then(() => {
        console.log('user changed info');
        // setUsers([...users, update])
        //   // console.log('foundFamily', foundFamily);
        // setUsers(data)
        // setUserLoggedIn(update)
        // setIsLoggedIn(true)
        // setUserLoggedInAfterLogIn(update, invited)
      })
  }

  //Fetch MenuItems
  const fetchWeeklyMenu = async () => {
    const res = await fetch(`${BACKEND_URL}/api/weeklymenus`)
    const data = await res.json()
    console.log('weekly menus', data);
    return data
  }


  //Add Weekly Menu
  const addWeeklyMenu = (weekMenu, weekNr) => {
    console.log('this weeks menu and weeknr', weekMenu, weekNr);
    const weekMenuToSaveToDB = {
      weekNr,
      weekMenu,
      owner: {
        id: userLoggedIn._id,
        // firstName: userLoggedIn.firstName,
        // lastName: userLoggedIn.lastName,
        // email: userLoggedIn.email,
        // color: userLoggedIn.color,
        // familyMembers: userLoggedIn.familyMembers,
        // spouse: userLoggedIn.spouse,
      }
    }
    console.log('weekMenuToSaveToDB', weekMenuToSaveToDB);
    fetch(`${BACKEND_URL}/api/weeklymenus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weekMenuToSaveToDB)
    })
      .then(() => {
        console.log('new weeks menu added');
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
  const addNote = (newNote) => {
    ////console.log('newNote: ', newNote);
    const newNoteToPost = {
      task: newNote.task,
      date: newNote.date,
      owner: {
        id: userLoggedIn._id,
        // firstName: userLoggedIn.firstName,
        // lastName: userLoggedIn.lastName,
        // email: userLoggedIn.email,
        // color: userLoggedIn.color,
        // familyMembers: userLoggedIn.familyMembers,
        // spouse: userLoggedIn.spouse,
      }
    }

    fetch(`${BACKEND_URL}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNoteToPost)
    })
      .then(() => { console.log('new note added'); })
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
      .then(() => { console.log('Note deleted'); })
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
  const addGroceryListItem = (newItem) => {
    console.log('newItem: ', newItem);
    const newItemToPost = {
      item: newItem.item,
      quantity: newItem.quantity,
      complete: false,
      owner: {
        id: userLoggedIn._id,
      }
    }

    fetch(`${BACKEND_URL}/api/grocerylistitems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItemToPost)
    })
      .then(() => {
        console.log('new groceryList item added');
        // setGroceryListItems([...groceryListItem, newItemToPost])
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

    // setGroceryListItems(
    //   groceryListItems.map((groceryListItem) =>
    //     groceryListItem._id === id ? { ...groceryListItem, complete: data.complete } : groceryListItem))
  }

  //Delete GroceryListItem
  const deleteGroceryListItem = async (id) => {

    console.log('id of list item to delete:', id);

    if (!id.startsWith('625')) {
      console.log('groceryListItem', groceryListItems);
      fetch(`${BACKEND_URL}/api/grocerylistitems`)
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
          console.log('id', id);

          let foundItem = data.find(listItem => listItem.item === id);
          console.log('foundItemId:', foundItem);
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
              console.log('grocerylistitem deleted');
              // const newGroceryList = groceryListItems.filter(item => item._id !== foundItem._id);
              // setGroceryListItems(newGroceryList)
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
          console.log('grocerylistitem deleted');

        })
      // const newGroceryList = groceryListItems.filter(item => item._id !== id);
      // setGroceryListItems(newGroceryList)
    }
  }

  //Update GroceryListItem
  const updateQuantity = async (changedItem) => {
    console.log('changedItem', changedItem);
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
      console.log('found by id', found);
    }
    // const updQuantity = {
    //   quantity: changedItem.quantity
    // }
    // console.log('updQuantity', updQuantity);


    console.log('id', id);
    fetch(`${BACKEND_URL}/api/grocerylistitems/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: changedItem.quantity })
    })

      .then(res => {
        if (res.ok) {
          console.log(('Update successful!'));
        }
        else {
          console.log('Update unsuccessful!');
        }
        return res
      })
      .then((data) => {
        console.log('Quantity updated', data);
      })
    // setGroceryListItem(groceryListItems.map(item => item._id === id ? { ...item, complete: !item.complete } : item))

    // })
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
