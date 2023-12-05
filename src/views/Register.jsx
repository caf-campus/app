import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { submitRegister } from '../core'

const Register = () => {
  const [message, setMessage] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const response = sessionStorage.getItem('user')
    if (response) {
      navigate('/profile')
      return
    }
  }, [navigate])

  return (
    <div className="h-screen w-full flex flex-col text-black space-y-10 justify-center items-center bgcolor">
      <h1 className="w-fit text-5xl font-Rollicker">Welcome !</h1>
      <div className="flex w-[30%] flex-col space-y-20">
        <form
          className="flex flex-col space-y-5"
          onSubmit={e => {
            e.preventDefault()
            submitRegister({ mail, password }, setMessage, navigate)
          }}
        >
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold" htmlFor="">
              E-Mail adress or username
            </label>
            <input
              value={mail}
              onChange={e => setMail(e.target.value)}
              placeholder="E-Mail adress or username"
              className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
              type="mail"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
              type="password"
            />
          </div>
          <span className="textcolor font-Inter text-sm underline cursor-pointer">
            Forgot password ?
          </span>
          <p className="w-full text-center">{message}</p>
          <div className="w-full flex justify-center items-center">
            <button
              className="mt-5 w-[50%] border border-black text-black rounded-full font-Anton bg-gray-300 py-2 px-5"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <span className="textcolor font-Inter text-sm">
              I already have an account yet.
              <Link
                className="ml-2 text-gray-300 font-bold underline cursor-pointer"
                to="/login"
              >
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
