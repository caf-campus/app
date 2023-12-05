import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import cafe from '../assets/cafe.png'
import { auth } from '../firebase'
import { ReadData, handleLogOut } from '../core'

const Layout = () => {
  const [userDataState, setUserData] = useState('')

  const fetchUserData = async () => {
    const userData = await ReadData(`users/${auth.currentUser.uid}`)
    if (userData) {
      setUserData(userData)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        fetchUserData()
      }
    })
  })

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-between items-center">
        <header className="sticky top-0 z-10 w-full h-28">
          <nav className="h-full w-full flex justify-center text-white">
            <ul className="w-full p-10 bg-black right-0 flex items-center space-x-5 text-md">
              <div className="w-[20%] flex space-x-5">
                <img srcSet={cafe} className="w-6 h-6" alt="logo" />
                <h1 className="text-white">Café Campus</h1>
              </div>
              <li className="w-[60%] space-x-5 text-md flex justify-center items-center">
                <Link to="/">Home</Link>
                <Link to="/paneladmin">Admin Panel</Link>
              </li>
              <div className="w-[20%] flex justify-end space-x-5">
                {userDataState ? (
                  <>
                    <Link to="/profile">{userDataState.pseudo}</Link>
                    <button onClick={handleLogOut}>Disconnect</button>
                  </>
                ) : (
                  <Link to="/login">Login</Link>
                )}

                {/* <img src="" alt="user image" /> */}
              </div>
            </ul>
          </nav>
        </header>
        <div className="w-full">
          <Outlet />
        </div>
        <footer className="w-full flex justify-center items-center bg-black">
          <ul className="p-10 flex items-center space-x-20 text-white text-md">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/tos">Terms of Service</Link>
            </li>
          </ul>
        </footer>
      </div>
    </>
  )
}

export default Layout
