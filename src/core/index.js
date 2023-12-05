import { auth, db } from '../firebase'
import { ref, push } from 'firebase/database'

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

export const pushData = (path, data) => {
  return push(ref(db, path), data)
}

export const createArticle = (data, navigate) => {
  navigate('/')
  return pushData(`articles/`, data)
}

export const createComment = data => {
  return pushData(`commentary/`, data)
}

export const submitUpdate = (user, setMessage, navigate) => {
  const { mail, password } = user
  auth
    .updateCurrentUser(mail, password)
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

export const submitDeleteUser = (user, setMessage, navigate) => {
  const { uid } = user
  auth
    .deleteUser(uid)
    .then(() => {
      sessionStorage.clear()
      navigate('/')
    })
    .catch(err => {
      console.log(err.message)
      setMessage(err.message)
      return
    })
}
