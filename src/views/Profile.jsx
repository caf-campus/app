import { useEffect, useState } from 'react'
import { ReadData, updateData, deleteData } from '../core' // Assuming you have an UpdateData function
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
    await updateData(`users/${auth.currentUser.uid}`, userDataState)
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
    <div className="bg-white h-[75vh] w-full flex flex-col text-black space-y-10 justify-center items-center bgcolor">
      <h1 className="w-fit text-5xl font-Rollicker">Profile</h1>
      <div className="flex w-fit flex justify-center items-center space-x-20 border p-5 shadow-md rounded-xl">
        <div className="flex flex-col space-y-5">
          <div className="flex space-x-5 h-full items-center">
            <label className="font-Inter font-semibold" htmlFor="">
              Nom :
            </label>
            {isEditMode ? (
              <input
                type="text"
                name="lastname"
                className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
                value={userDataState.lastname}
                onChange={handleInputChange}
              />
            ) : (
              <p className="font-Inter text-gray-500">
                {userDataState.lastname}
              </p>
            )}
          </div>
          <div className="flex space-x-5 h-full items-center">
            <label className="font-Inter font-semibold" htmlFor="">
              Prénom :
            </label>
            {isEditMode ? (
              <input
                type="text"
                name="firstname"
                className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
                value={userDataState.firstname}
                onChange={handleInputChange}
              />
            ) : (
              <p className="font-Inter text-gray-500">
                {userDataState.firstname}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex space-x-5 h-full items-center">
            <label className="font-Inter font-semibold" htmlFor="">
              Pseudonyme :
            </label>
            {isEditMode ? (
              <input
                type="text"
                name="pseudo"
                className="px-4 py-1 font-Inter rounded-full h-10 bg-white border border-neutral-800"
                value={userDataState.pseudo}
                onChange={handleInputChange}
              />
            ) : (
              <p className="font-Inter text-gray-500">{userDataState.pseudo}</p>
            )}
          </div>
          <div className="flex space-x-5">
            <label className="font-Inter font-semibold" htmlFor="">
              Adresse e-mail :
            </label>
            <p className="font-Inter text-gray-500">{userDataState.email}</p>
          </div>
        </div>
        <div>
          {isEditMode ? (
            <button
              className="border border-black text-black rounded-full font-Anton py-2 px-5"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button
              className="border border-black text-black rounded-full font-Anton py-2 px-5"
              onClick={handleModifyClick}
            >
              Modify
            </button>
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
