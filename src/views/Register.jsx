import { useState, useEffect } from 'react'
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
    })
  })
  return (
    <>
      <div className="bg-white h-screen w-full flex flex-col text-black space-y-20 justify-center items-center bgcolor">
        <h1 className="w-fit text-5xl font-Rollicker">Welcome !</h1>
        <div className="w-full">
          <form
            className="flex w-full flex-col justify-center items-center"
            onSubmit={e => {
              e.preventDefault()
              submitRegister()
            }}
          >
            <div className="w-[60%] flex justify-center items-center space-x-20">
              <section className="flex flex-col space-y-10 w-[50%]">
                <div className="flex flex-col space-y-2">
                  <label className="font-Inter font-semibold" htmlFor="">
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="LastName"
                    className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
                    type="text"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-Inter font-semibold" htmlFor="">
                    First Name
                  </label>
                  <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="FirstName"
                    className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
                    type="text"
                  />
                </div>
              </section>
              <section className="flex flex-col space-y-5 w-[50%]">
                <div className="flex flex-col space-y-2">
                  <label className="font-Inter font-semibold" htmlFor="">
                    Pseudonyme
                  </label>
                  <input
                    value={pseudonyme}
                    onChange={e => setPseudonyme(e.target.value)}
                    placeholder="Pseudonyme"
                    className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
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
                    className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
                    type="email"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-Inter font-semibold">Password</label>
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
                    type="password"
                  />
                </div>
              </section>
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-5">
              <p className="w-full text-center">{message}</p>
              <button
                className="mt-5 w-fit border border-black text-black rounded-full font-Anton py-2 px-5"
                type="submit"
              >
                Register
              </button>
              <span className="textcolor font-Inter text-sm">
                I already have an account yet.
                <Link
                  className="ml-2 text-neutral-800 font-bold underline cursor-pointer"
                  to="/login"
                >
                  Log in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
