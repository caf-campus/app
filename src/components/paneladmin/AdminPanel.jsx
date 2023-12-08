/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import TableUsersComponent from './TableUsersComponent'
import TableArticlesComponent from './TableArticlesComponent'

const AdminPanel = () => {
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState('Utilisateurs')

  // Fonction pour changer l'onglet actif
  const handleTabClick = tabName => {
    setActiveTab(tabName)
  }

  // Déterminer quel composant afficher
  const renderComponent = () => {
    switch (activeTab) {
      case 'Utilisateurs':
        return <TableUsersComponent />
      case 'Articles':
        return <TableArticlesComponent />
      default:
        return null
    }
  }

  return (
    <div className="flex top-50 h-[90vh]">
      <ul className="menu bg-base-200 w-1/5">
        <li>
          <a
            className={activeTab === 'Utilisateurs' ? 'active' : ''}
            onClick={() => handleTabClick('Utilisateurs')}
          >
            Utilisateurs
          </a>
        </li>
        <li>
          <a
            className={activeTab === 'Articles' ? 'active' : ''}
            onClick={() => handleTabClick('Articles')}
          >
            Articles
          </a>
        </li>
      </ul>
      {/* Le composant actif */}
      <div className="m1-4 w-3/4">{renderComponent()}</div>
    </div>
  )
}

export default AdminPanel
