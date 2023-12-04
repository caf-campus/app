import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Notfound from './components/404.jsx'
import Layout from './components/Layout.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
