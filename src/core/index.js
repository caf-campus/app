import { auth, db } from '../firebase'
import { ref, set, get, push } from 'firebase/database'

export const CreateNewUser = (path, data) => {
  const reference = ref(db, path)
  return set(reference, data)
}

export const ReadData = async path => {
  return get(ref(db, path))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        return 0
      }
    })
    .catch(error => {
      console.error(error)
    })
}

export const handleLogOut = navigate => {
  auth
    .signOut()
    .then(() => {
      navigate('/login')
    })
    .catch(err => {
      console.log(err)
    })
}

export const submitLogin = (user, setMessage, navigate) => {
  const { mail, password } = user
  auth
    .signInWithEmailAndPassword(mail, password)
    .then(({ user }) => {
      if (user) {
        navigate('/profile')
        window.location.reload()
      }
    })
    .catch(err => {
      setMessage(err.message)
      return
    })
}
export const submitRegister = async (
  { mail, password, firstName, lastName, pseudonyme },
  navigate,
  setMessage,
) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(mail, password)
    const userData = {
      firstname: firstName,
      lastname: lastName,
      pseudo: pseudonyme,
      email: mail,
      articles: [],
    }
    await CreateNewUser(`users/${user.uid}`, userData)
    navigate('/profile')
  } catch (error) {
    setMessage(error)
    console.error(error)
  }
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

export const getUserByID = async userID => {
  try {
    const userRef = ref(db, `users/${userID}`)
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
