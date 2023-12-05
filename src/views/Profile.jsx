import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState('')

  useEffect(() => {
    const response = JSON.parse(sessionStorage.getItem('user'))
    if (response) {
      setUser(response)
      navigate('/profile')
      return
    }
  }, [navigate])

  return (
    <div className="h-screen w-full flex flex-col text-black space-y-10 justify-center items-center bgcolor">
      <h1 className="w-fit text-5xl font-Rollicker">Profil</h1>
      <div className="flex w-[30%] flex-col space-y-10">
        {/* Affiche les informations du profil ici */}
        <div>
          <label className="font-Inter font-semibold" htmlFor="">
            Nom :
          </label>
          <p className="font-Inter text-gray-500">Votre Nom</p>
        </div>
        <div>
          <label className="font-Inter font-semibold" htmlFor="">
            Prénom :
          </label>
          <p className="font-Inter text-gray-500">Votre Prénom</p>
        </div>
        <div>
          <label className="font-Inter font-semibold" htmlFor="">
            Adresse e-mail :
          </label>
          <p className="font-Inter text-gray-500">{user.email}</p>
        </div>
        {/* Ajoute d'autres informations du profil au besoin */}
      </div>
    </div>
  )
}

export default Profile
