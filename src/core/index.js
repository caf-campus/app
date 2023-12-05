import { auth } from '../firebase'

export const submitLogin = (user, setMessage, navigate) => {
  const { mail, password } = user
  auth
    .signInWithEmailAndPassword(mail, password)
    .then(({ user }) => {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user))
        navigate('/profile')
        window.location.reload()
      }
    })
    .catch(err => {
      setMessage(err.message)
      return
    })
}
export const submitRegister = (user, setMessage, navigate) => {
  const { mail, password } = user
  auth
    .createUserWithEmailAndPassword(mail, password)
    .then(({ user }) => {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user))
        navigate('/profile')
        window.location.reload()
      }
    })
    .catch(err => {
      console.log(err.message)
      setMessage(err.message)
      return
    })
}
