import { CgClose } from 'react-icons/cg'
import AddMenuItem from './AddMenuItem'

const AddMenuPopup = (props) => {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <AddMenuItem onAddMenuItem={props.onAddMenuItem} setTrigger={props.setTrigger} day={props.day}></AddMenuItem>
        <CgClose className="close-btn" onClick={() => props.setTrigger(false)} />
        {/* <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button> */}
      </div>
    </div>
  ) : '';
}
export default AddMenuPopup
