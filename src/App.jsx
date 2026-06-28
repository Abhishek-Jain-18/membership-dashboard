import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { useDarkMode } from './hooks/useDarkMode'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import AddMember from './pages/AddMember'

export default function App() {
  const [dark, setDark] = useDarkMode()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout dark={dark} setDark={setDark} />}>
          <Route path="/"            element={<Dashboard />} />
          <Route path="/members"     element={<Members />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
