import { CgClose } from 'react-icons/cg'
import AddWeeklyMenu from './AddWeeklyMenu'

const AddMenuPopup = (props) => {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <AddWeeklyMenu addWeeklyMenu={props.addWeeklyMenu} setTrigger={props.setTrigger} day={props.day} weeklyMenu={props.weeklyMenu} weekDays={props.weekDays}></AddWeeklyMenu>
        <CgClose className="close-btn" onClick={() => props.setTrigger(false)} />
      </div>
    </div>
  ) : '';
}
export default AddMenuPopup
