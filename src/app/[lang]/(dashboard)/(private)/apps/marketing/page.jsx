import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Marketing from './views/marketing/Marketing'
import Dashboard from './views/marketing/Dashboard'
import Reports from './views/marketing/Reports'
import Settings from './views/marketing/Settings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/marketing/dashboard" element={<Dashboard />} />
        <Route path="/marketing/reports" element={<Reports />} />
        <Route path="/marketing/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
