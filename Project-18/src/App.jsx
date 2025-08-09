import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Farmers from './pages/Farmers'
import Marchants from './pages/Merchants'
import Login from './pages/Login'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/' element={ <Home/> }/>
      <Route path='/about' element={ <About/> }/>
      <Route path='/farmers' element={ <Farmers/> }/>
      <Route path='/marchants' element={ <Marchants/> }/>
      <Route path='/login' element={ <Login/> }/>
    </Routes>
    <Footer></Footer>
    </>
  )
}

export default App
