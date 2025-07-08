import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home'
import FoodItemsProvider from './Storage/Project3-storage'

function App() {


  return (
    <>
    <FoodItemsProvider>
   <Header></Header>
   <Home></Home>
    </FoodItemsProvider>
    </>
  )
}

export default App
