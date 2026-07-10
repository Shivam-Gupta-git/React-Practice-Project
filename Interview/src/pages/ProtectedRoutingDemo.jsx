import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/Protected Routing/Home'
import Contact from '../components/Protected Routing/Contact'
import About from '../components/Protected Routing/About'
import Login from '../components/Protected Routing/Login'
import Header from '../components/Protected Routing/Header'
import ProtectedRouteFunction from '../components/Protected Routing/ProtectedRouterFunc'

/** Isolated demo using MemoryRouter to avoid conflicting with dashboard layout */
export default function ProtectedRoutingDemo() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <div className="min-h-100 bg-linear-to-br from-amber-50 to-amber-100 dark:from-slate-800 dark:to-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/contact"
            element={
              <ProtectedRouteFunction>
                <Contact />
              </ProtectedRouteFunction>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRouteFunction>
                <About />
              </ProtectedRouteFunction>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </MemoryRouter>
  )
}
