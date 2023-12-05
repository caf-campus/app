import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login.jsx'
import Home from './views/Home.jsx'
import Notfound from './views/404.jsx'
import Layout from './components/Layout.jsx'
import Register from './views/Register.jsx'
import ArticleCreation from './components/ArticleCreation.jsx'
import AdminPanel from './components/paneladmin/AdminPanel.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/articlecreation" element={<ArticleCreation />} />
            <Route path="/paneladmin" element={<AdminPanel />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
