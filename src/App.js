import { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homework from './components/Homework/Homework'
import GroceryList from './components/GroceryList/GroceryList'
import Menu from './components/Menu/Menu'
import Remember from './components/Remember/Remember'
import Chatt from './components/Chatt/Chatt'
import Savings from './components/Savings/Savings'
import Calendar from './components/Calendar/Calendar'
import Todo from './components/Todo/Todo'



function App() {
  const [data, setData] = useState([]);
  // console.log(data);
  const [homework, setHomework] = useState([]);
  const [remember, setRemember] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      await fetch('http://localhost:5000/api/users')
        .then((response) => response.json())
        .then((data) => {
          setData(data)
          console.log(data);
        })
    }
    fetchData()
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

  //Fetch homeworks
  const fetchHomeworks = async () => {
    const res = await fetch('http://localhost:5000/api/homeworks')
    const data = await res.json()

    return data
  }

  //Fetch homework
  const fetchHomework = async (id) => {
    const res = await fetch(`http://localhost:5000/api/homeworks/${id}`)
    const data = await res.json()

    return data
  }


  //Add Homework
  const addHomework = (newHomework) => {
    // console.log(homework);
    const newHomeworkToPost = {
      subject: newHomework.subject,
      assignment: newHomework.assignment,
      complete: false
    }

    fetch('http://localhost:5000/api/homeworks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHomeworkToPost)
    })
      .then(() => { console.log('new homework added'); })
    console.log('homework', homework);
    setHomework([...homework, newHomeworkToPost])

  }

  //Delete Homework
  const deleteHomework = (id) => {
    console.log(id);

    fetch(`http://localhost:5000/api/homeworks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          console.log(('Delete successful!'));
        }
        else {
          console.log('Delete unsuccessful!');
        }
        return res
      })
      .then(() => { console.log('Homework deleted'); })
    const newHomeworkList = homework.filter(item => item._id !== id);
    setHomework(newHomeworkList)

  }

  // //Update Homework
  // const updateHomework = (id) => {
  //   console.log("id", id);

  //   // console.log("completed", completed);

  //   // const updHomework = {
  //   //   complete: completed
  //   // }
  //   // console.log('updateHomework', updHomework);

  //   const found = homework.find(item => item._id === id)
  //   console.log('found', found);
  //   let complete;
  //   if (found.complete) {
  //     complete = true;
  //   } else {
  //     complete = false;
  //   }
  //   console.log('complete', complete);
  //   fetch(`http://localhost:5000/api/homeworks/${id}`, {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ complete: !complete })
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         console.log(('Update successful!'));
  //       }
  //       else {
  //         console.log('Update unsuccessful!');
  //       }
  //       return res
  //     })
  //     .then(() => { console.log('Homework updated'); })
  //   setHomework(homework.map(homework => homework._id === id ? { ...homework, complete: !homework.complete } : homework))

  // }

  //Toggle completed homework
  const toggleComplete = async (id) => {
    const homeworkToToggle = await fetchHomework(id);
    const toggleHomework = { ...homeworkToToggle, complete: !homeworkToToggle.complete }

    const res = await fetch(`http://localhost:5000/api/homeworks/${id}`, {
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
    const res = await fetch('http://localhost:5000/api/remembers')
    const data = await res.json()

    return data
  }

  //Fetch remember
  const fetchRemember = async (id) => {
    const res = await fetch(`http://localhost:5000/api/remembers/${id}`)
    const data = await res.json()

    return data
  }

  //Add Remember
  const addRemember = (newRemember) => {
    // console.log(newRemember);
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
        color = '#000';

    }
    const newRememberToPost = {
      task: newRemember.task,
      date: newRemember.date,
      familyMember: newRemember.familyMember,
      color: color
    }

    fetch('http://localhost:5000/api/remembers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRememberToPost)
    })
      .then(() => { console.log('new remember added'); })
    console.log('remember', remember);
    setRemember([...remember, newRememberToPost])
  }

  //Delete Remember
  const deleteRemember = (id) => {
    console.log(id);

    fetch(`http://localhost:5000/api/remembers/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          console.log(('Delete successful!'));
        }
        else {
          console.log('Delete unsuccessful!');
        }
        return res
      })
      .then(() => { console.log('Remember deleted'); })
    const newRememberList = remember.filter(item => item._id !== id);
    setRemember(newRememberList)

  }

  return (
    <div className="App">
      <Header />
      <div className="upper-container">
        <Todo />
        <Calendar />
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
    </div>
  );
}

export default App;
