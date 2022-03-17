import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homework from './components/Homework/Homework'
import GroceryList from './components/GroceryList/GroceryList'
import Menu from './components/Menu/Menu'
import Remember from './components/Remember/Remember'
import Chatt from './components/Chatt/Chatt'
import Savings from './components/Savings/Savings'
import Calendar from './components/Calendar/Calendar'


function App() {
  return (
    <div className="App">
      <Header />

      <GroceryList />
      <Menu />
      <Remember />
      <Savings />
      <Chatt />
      <Calendar />
      <Homework />
      <Footer />
    </div>
  );
}

export default App;
