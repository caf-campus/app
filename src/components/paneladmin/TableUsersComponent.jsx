import { useEffect, useState } from 'react'
import { ReadData, deleteUser } from '../../core'

const TableUsersComponent = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    ReadData('users')
      .then(data => {
        const usersArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }))
        setUsers(usersArray)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className="overflow-x-auto flex-grow pl-6">
      <p className="font-bold">Utilisateurs inscrits : {users.length}</p>
      <table className="mt-2 table table-xs">
        <thead>
          <tr>
            <th>Pseudo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.pseudo}</td>
              <td>{user.lastname}</td>
              <td>{user.firstname}</td>
              <td>{user.email}</td>
              <td>{user.id}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => {
                    deleteUser(user.id)
                    window.location.reload()
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableUsersComponent
