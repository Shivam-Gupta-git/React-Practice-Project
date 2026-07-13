import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardProvider } from './context/DashboardContext'
import Layout from './components/Layout'
import CodePracticePage from './pages/CodePracticePage'
import Toast from './components/Toast'

function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/practice" element={<CodePracticePage />} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </DashboardProvider>
  )
}

export default App
