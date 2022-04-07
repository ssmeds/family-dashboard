import { CgClose } from 'react-icons/cg'
import AddMenuItem from './AddMenuItem'

const AddMenuPopup = (props) => {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <AddMenuItem onAddMenuItem={props.onAddMenuItem} setTrigger={props.setTrigger} day={props.day} weeklyMenu={props.weeklyMenu} weekDays={props.weekDays}></AddMenuItem>
        <CgClose className="close-btn" onClick={() => props.setTrigger(false)} />
      </div>
    </div>
  ) : '';
}
export default AddMenuPopup
