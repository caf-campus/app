import { useEffect, useState } from 'react'
import { ReadData, UpdateData, deleteData } from '../core' // Assuming you have an UpdateData function
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [userDataState, setUserData] = useState('')
  const [isEditMode, setEditMode] = useState(false)
  const navigate = useNavigate()

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
      } else {
        navigate('/')
      }
    })
  }, [navigate])

  const handleModifyClick = () => {
    setEditMode(true)
  }

  const handleSaveClick = async () => {
    // Update user data in the database
    await UpdateData(`users/${auth.currentUser.uid}`, userDataState)
    setEditMode(false)
  }

  const handleInputChange = e => {
    // Update userDataState when input values change
    setUserData({
      ...userDataState,
      [e.target.name]: e.target.value,
    })
  }

  const handleDeleteClick = async () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete your account?',
    )

    if (shouldDelete) {
      deleteData(`users/${auth.currentUser.uid}`)
      auth.signOut()
      auth.currentUser.delete().then()
      navigate('/')
      window.location.reload()
    }
  }

  return (
    <div className="h-screen w-full flex flex-col text-black space-y-10 justify-center items-center bgcolor">
      <h1 className="w-fit text-5xl font-Rollicker"></h1>
      <div className="flex w-[30%] flex-col space-y-10">
        <div>
          <label className="font-Inter font-semibold" htmlFor="">
            Nom :
          </label>
          {isEditMode ? (
            <input
              type="text"
              name="lastname"
              value={userDataState.lastname}
              onChange={handleInputChange}
            />
          ) : (
            <p className="font-Inter text-gray-500">{userDataState.lastname}</p>
          )}
        </div>
        <div>
          <label className="font-Inter font-semibold" htmlFor="">
            Prénom :
          </label>
          {isEditMode ? (
            <input
              type="text"
              name="firstname"
              value={userDataState.firstname}
              onChange={handleInputChange}
            />
          ) : (
            <p className="font-Inter text-gray-500">
              {userDataState.firstname}
            </p>
          )}
        </div>
        <div>
          <label className="font-Inter font-semibold" htmlFor="">
            Pseudonyme :
          </label>
          {isEditMode ? (
            <input
              type="text"
              name="pseudo"
              value={userDataState.pseudo}
              onChange={handleInputChange}
            />
          ) : (
            <p className="font-Inter text-gray-500">{userDataState.pseudo}</p>
          )}
        </div>
        <div>
          <label className="font-Inter font-semibold" htmlFor="">
            Adresse e-mail :
          </label>
          <p className="font-Inter text-gray-500">{userDataState.email}</p>
        </div>
        <div>
          {isEditMode ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleModifyClick}>Modify</button>
          )}
        </div>
        <div>
          <button onClick={handleDeleteClick}>Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default Profile
