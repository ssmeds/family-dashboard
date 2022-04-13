import CalendarAddTask from './CalendarAddTask'
import { CgClose } from 'react-icons/cg'

const CalendarPopup = (props) => {

  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <CalendarAddTask date={props.date} addNote={props.addNote} setTrigger={props.setTrigger} />
        <CgClose className="close-btn" onClick={() => props.setTrigger(false)} />
        {/* <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button> */}
      </div>
    </div>
  ) : '';
}

export default CalendarPopup
