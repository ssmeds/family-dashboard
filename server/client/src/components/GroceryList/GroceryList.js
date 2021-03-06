import './groceryList.css'
import Week from '.././Week/Week'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

const GroceryList = ({ addGroceryListItem, groceryListItems, setGroceryListItems, toggleCompletedGroceryListItem, deleteGroceryListItem, updateQuantity, userLoggedIn }) => {
  // console.log('groceryListItems from App', groceryListItems);
  const [item, setItem] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(null);

  useEffect(() => {
    calculateTotal();
  })

  let userShoppingList = [];
  groceryListItems.map(item => {
    // console.log('item.owner.id', item);
    if (userLoggedIn._id === item.owner.id || userLoggedIn.OGid === item.owner.id) {
      userShoppingList.push(item)
    }
  })
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddButtonClick()
    }
  }

  const handleAddButtonClick = () => {
    const newItem = {
      item: item,
      quantity: 1,
      complete: false,
    };
    addGroceryListItem(newItem)
    setInputValue('');
    setItem('');

    calculateTotal();

  };
  const toggleComplete = (id) => {
    let foundItem = groceryListItems.find(item => item._id === id);
    foundItem.complete = !foundItem.complete;
    foundItem.quantity = 0;
    calculateTotal();
    toggleCompletedGroceryListItem(id)
    setGroceryListItems(
      groceryListItems.map((groceryListItem) =>
        groceryListItem._id === id ? { ...groceryListItem, complete: foundItem.complete } : groceryListItem))
  };

  const handleQuantityIncrease = (id, name) => {
    // console.log('id or name in increase', id, name);
    if (id === undefined) {
      let foundItem = groceryListItems.find(item => item.item === name);
      // console.log('foundItem undefined id', foundItem);
      foundItem.quantity++;
      calculateTotal();
      setGroceryListItems(groceryListItems.map(item => item._id === id ? { ...item, quantity: foundItem.quantity++ } : item))
      updateQuantity(foundItem)
    } else {
      let foundItem = groceryListItems.find(item => item._id === id);
      // console.log('foundItem', foundItem);
      foundItem.quantity++;
      calculateTotal();
      setGroceryListItems(groceryListItems.map(item => item._id === id ? { ...item, quantity: foundItem.quantity++ } : item))
      updateQuantity(foundItem)
    }
  };

  const handleQuantityDecrease = (id, name) => {
    // console.log('id or name in decrease', id, name);
    if (id === undefined) {
      let foundItem = groceryListItems.find(item => item.item === name);
      // console.log('foundItem', foundItem);
      foundItem.quantity--;
      calculateTotal();
      setGroceryListItems(groceryListItems.map(item => item._id === id ? { ...item, quantity: foundItem.quantity-- } : item))
    } else {
      let foundItem = groceryListItems.find(item => item._id === id);
      // console.log('foundItem', foundItem);
      foundItem.quantity--;
      calculateTotal();
      setGroceryListItems(groceryListItems.map(item => item._id === id ? { ...item, quantity: foundItem.quantity-- } : item))

    }
  };

  const calculateTotal = () => {
    const totalItemCount = userShoppingList.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  };

  const handleRemoveItem = (id, name) => {
    // console.log('klick p?? krysset id', id);
    if (id === undefined) {
      deleteGroceryListItem(name)
      const newGroceryList = groceryListItems.filter(item => item.item !== name);
      setGroceryListItems(newGroceryList)
    } else {
      deleteGroceryListItem(id)
      const newGroceryList = groceryListItems.filter(item => item._id !== id);
      setGroceryListItems(newGroceryList)
    }

    calculateTotal();
  }



  return (
    <div className="groceryList-container card">
      <div className='groceryList-header card-header'>
        <h1>Ink??pslista</h1>
        <Week />
      </div>
      <div className='add-item-box'>
        <input value={item} onChange={(e) => { setItem(e.target.value) }} onKeyDown={(e) => handleKeyDown(e)} className='add-item-input' placeholder='L??gg till en vara...' />
        <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
      </div>
      <div className='item-list'>
        {userShoppingList.map((item, id) => (

          <div className='item-container'>
            <div className='item-name' onClick={() => toggleComplete(item._id)}>
              {item.complete ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span className='completed'>{item.item}</span>
                </>
              ) :
                (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span key={id} >{item.item}</span>
                  </>
                )
              }
            </div>
            <div className='quantity'>
              <button>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(item._id, item.item)} />
              </button>
              <span> {item.quantity} </span>
              <button>
                <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(item._id, item.item)} />
              </button>
              <button className='clear-btn' onClick={() => handleRemoveItem(item._id, item.item)}>&#9747;</button>
            </div>
          </div>

        ))}
      </div>
      <div className='total'>Totalt: {totalItemCount} st</div>
    </div>
  )
}
export default GroceryList
