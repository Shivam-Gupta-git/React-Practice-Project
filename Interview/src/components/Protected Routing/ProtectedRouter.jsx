import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import Login from './Login'
import Header from './Header'
import ProtectedRouteFunction from './ProtectedRouterFunc'

function ProtectedRouter() {
   return(
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}></Route>
        <Route path={'/Contact'} element={
          <ProtectedRouteFunction>
            <Contact/>
          </ProtectedRouteFunction>
        }></Route>
        <Route path={'/About'} element={
          <ProtectedRouteFunction>
            <About/>
          </ProtectedRouteFunction>
        }></Route>
        <Route path={'/Login'} element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
   )
}

export default ProtectedRouter