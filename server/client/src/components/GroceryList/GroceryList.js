import './groceryList.css'
import Week from '.././Week/Week'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(null);


  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
      handleAddButtonClick()
    }
  }

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    setInputValue('');
    calculateTotal();
  };
  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    newItems[index].quantity = 0;
    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];
    // console.log('newItems', newItems);
    newItems[index].quantity--;
    setItems(newItems);
    calculateTotal();
  };

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

  const handleRemoveItem = (index) => {
    // console.log('klick på krysset index', index);
    let newList = items;
    newList.splice(index, 1);
    setItems([...newList])
  }

  return (
    <div className="groceryList-container card">
      <div className='groceryList-header card-header'>
        <h1>Inköpslista</h1>
        <Week />
      </div>
      <div className='add-item-box'>
        <input value={inputValue} onChange={(event) => handleChange(event)} onKeyDown={(event) => handleKeyDown(event)} className='add-item-input' placeholder='Lägg till en vara...' />
        <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
      </div>
      <div className='item-list'>
        {items.map((item, index) => (
          <div className='item-container'>
            <div className='item-name' onClick={() => toggleComplete(index)}>
              {item.isSelected ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span className='completed'>{item.itemName}</span>
                </>
              ) :
                (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span key={index} >{item.itemName}</span>
                  </>
                )
              }
            </div>
            <div className='quantity'>
              <button>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
              </button>
              <span> {item.quantity} </span>
              <button>
                <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
              </button>
              <ClearIcon className='clear-btn' onClick={() => handleRemoveItem(index)} />
            </div>
          </div>

        ))}
      </div>
      <div className='total'>Totalt: {totalItemCount} st</div>
    </div>
  )
}
export default GroceryList
