import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import About from './pages/About'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlacedOrders from './pages/PlacedOrders'
import Products from './pages/Products'
import Wishlist from './pages/Wishlist'
import Navbar from './components/Navbar'
import Contacts from './pages/Contacts'


function App() {


  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Collection' element={<Collection/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Orders' element={<Orders/>}/>
        <Route path='/PlaceOrders' element={<PlacedOrders/>}/>
        <Route path='/Product/:ProductId' element={<Products/>}/>
        <Route path='/Wishlist' element={<Wishlist/>}/>
        <Route path='/Contact' element={<Contacts/>}/>
      </Routes>
    </div>
  )
}

export default App
