import { auth, db } from '../firebase'
import { ref, set, get, push, update, remove } from 'firebase/database'

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

export const handleLogOut = () => {
  auth
    .signOut()
    .then(() => {
      window.location.href = '/'
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
      }
    })
    .catch(err => {
      setMessage(err.message)
      return
    })
}

export const UpdateData = async (path, data) => {
  const reference = ref(db, path)
  return update(reference, data)
}

export const pushData = (path, data) => {
  return push(ref(db, path), data)
}

export const deleteData = path => {
  const reference = ref(db, path)
  return remove(reference)
}

export const createArticle = (data, navigate) => {
  navigate('/')
  return pushData(`articles/`, data)
}

export const createComment = data => {
  return pushData(`commentary/`, data)
}

export const getUserByID = async userID => {
  try {
    const userRef = ref(db, `users/${userID}`)
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log('User not found')
      return null
    }
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getArticleByID = async articleID => {
  try {
    const articleRef = ref(db, `articles/${articleID}`)
    const snapshot = await get(articleRef)
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      throw new Error('Article not found')
    }
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const deleteArticle = async articleID => {
  try {
    const articleRef = ref(db, `articles/${articleID}`)
    await set(articleRef, null)
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const deleteUser = async userID => {
  try {
    const userRef = ref(db, `users/${userID}`)
    await set(userRef, null)
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const pushData = (path, data) => {
  return push(ref(db, path), data)
}

export const createArticle = data => {
  const articleRef = pushData(`articles/`, data)
  return articleRef
}
