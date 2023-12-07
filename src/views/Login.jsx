import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { submitLogin } from '../core'
import { auth } from '../firebase'

const Login = () => {
  const [message, setMessage] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/profile')
      }
    })
  })

  return (
    <div className="bg-white h-screen w-full flex flex-col text-black space-y-20 justify-center items-center bgcolor">
      <h1 className="w-fit text-5xl font-Rollicker">Welcome Back !</h1>
      <div className="flex w-[30%] flex-col space-y-20">
        <form
          className="flex flex-col space-y-5"
          onSubmit={e => {
            e.preventDefault()
            submitLogin({ mail, password }, setMessage, navigate)
          }}
        >
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold" htmlFor="">
              Email adress
            </label>
            <input
              value={mail}
              onChange={e => setMail(e.target.value)}
              placeholder="Email adress"
              className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
              type="mail"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold dark:text-white">
              Password
            </label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
              type="password"
            />
          </div>
          <p className="w-full text-center">{message}</p>
          <div className="w-full flex justify-center items-center">
            <button
              className="mt-5 w-[50%] border border-black text-black rounded-full font-Anton py-2 px-5"
              type="submit"
            >
              Connexion
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <span className="textcolor font-Inter text-sm dark:text-white">
              I dont have an account yet.
              <Link
                className="ml-2 text-neutral-800 font-bold text-center underline cursor-pointer"
                to="/register"
              >
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
