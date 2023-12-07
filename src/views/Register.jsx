import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../firebase'
import { CreateNewUser } from '../core'

const Register = () => {
  const [message, setMessage] = useState('')
  const [mail, setMail] = useState('')
  const [pseudonyme, setPseudonyme] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submitRegister = async () => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(mail, password)
      const userData = {
        firstname: firstName,
        lastname: lastName,
        pseudo: pseudonyme,
        email: mail,
        isAdmin: false,
        articles: [],
      }
      await CreateNewUser(`users/${user.uid}`, userData)
      navigate('/profile')
    } catch (error) {
      setMessage(error)
      console.error(error)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col text-black space-y-10 justify-center items-center bgcolor">
      <h1 className="w-fit text-5xl font-Rollicker">Welcome !</h1>
      <div className="flex w-[30%] flex-col space-y-20">
        <form
          className="flex flex-col space-y-5"
          onSubmit={e => {
            e.preventDefault()
            submitRegister()
          }}
        >
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold" htmlFor="">
              LastName
            </label>
            <input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="LastName"
              className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
              type="text"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold" htmlFor="">
              FirstName
            </label>
            <input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="FirstName"
              className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
              type="text"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold" htmlFor="">
              Pseudonyme
            </label>
            <input
              value={pseudonyme}
              onChange={e => setPseudonyme(e.target.value)}
              placeholder="Pseudonyme"
              className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
              type="text"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-Inter font-semibold" htmlFor="">
              E-mail
            </label>
            <input
              value={mail}
              onChange={e => setMail(e.target.value)}
              placeholder="E-mail"
              className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
              type="email"
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
