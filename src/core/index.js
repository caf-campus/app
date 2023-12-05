import { auth, db } from '../firebase'
import { ref, set, get } from 'firebase/database'

export const CreateNewUser = (path, data) => {
  const reference = ref(db, path)
  console.log(path)
  return set(reference, data)
}

export const ReadData = async path => {
  // await ref(db, path).onValue("value", (snapshot) => {
  //   return snapshot.val();
  // });
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
      window.location.reload()
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
export const submitRegister = async (user, navigate) => {
  try {
    const { mail, password, firstName, lastName, pseudonyme } = user
    const { userAuth } = await auth.createUserWithEmailAndPassword(
      mail,
      password,
    )
    const userData = {
      firstname: firstName,
      lastname: lastName,
      pseudo: pseudonyme,
      email: mail,
    }
    console.log(userAuth)
    await CreateNewUser(`users/${userAuth.uid}`, userData)
    navigate('/')
  } catch (error) {
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
