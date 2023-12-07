/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import TableUsersComponent from './TableUsersComponent'
import TablePostsComponent from './TablePostsComponent'
import DashboardComponent from './DashboardComponent'

const AdminPanel = () => {
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState('Table Users')
  // Fonction pour changer l'onglet actif
  const handleTabClick = tabName => {
    setActiveTab(tabName)
  }

  // Déterminer quel composant afficher
  const renderComponent = () => {
    switch (activeTab) {
      case 'Table Users':
        return <TableUsersComponent />
      case 'Table Posts':
        return <TablePostsComponent />
      case 'Dashboard (test)':
        return <DashboardComponent />
      default:
        return null
    }
  }

  return (
    <div className="flex top-50">
      <ul className="menu bg-base-200 w-1/5">
        <li>
          <a
            className={activeTab === 'Table Users' ? 'active' : ''}
            onClick={() => handleTabClick('Table Users')}
          >
            Table Users
          </a>
        </li>
        <li>
          <a
            className={activeTab === 'Table Posts' ? 'active' : ''}
            onClick={() => handleTabClick('Table Posts')}
          >
            Table Posts
          </a>
        </li>
        <li>
          <a
            className={activeTab === 'Dashboard (test)' ? 'active' : ''}
            onClick={() => handleTabClick('Dashboard (test)')}
          >
            Dashboard (test)
          </a>
        </li>
      </ul>
      {/* Le composant actif */}
      <div className="m1-4 w-3/4">{renderComponent()}</div>
    </div>
  )
}

export default AdminPanel
