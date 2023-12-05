import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login.jsx'
import Home from './views/Home.jsx'
import Notfound from './views/404.jsx'
import Layout from './components/Layout.jsx'
import Register from './views/Register.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
