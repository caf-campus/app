import { useEffect, useState } from 'react'
import { getArticleByID, getUserByID, updateData } from '../core'

const Article = () => {
  const [article, setArticle] = useState({})
  const [author, setAuthor] = useState({})
  const [isEditMode, setEditMode] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id') // Replace 'id' with the name of your parameter

    // Use the ID to fetch article data
    getArticleByID(id).then(article => {
      setArticle(article)
      getUserByID(article.auteur).then(user => {
        setAuthor(user)
      })
    })
  }, [])

  const handleModifyClick = () => {
    setEditMode(true)
  }

  const handleSaveClick = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    await updateData(`articles/${id}`, article)
    setEditMode(false)
  }

  const handleInputChange = e => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md min-w-[70%] max-w-[70%] m-10">
        <h1 className="text-4xl font-bold mb-4 text-grey-700">
          {isEditMode ? (
            <input
              className="border border-gray-400 p-2 rounded-md w-full dark:bg-white"
              name="titre"
              value={article.titre}
              onChange={handleInputChange}
            />
          ) : (
            article.titre
          )}
        </h1>
        <p className="text-gray-600 mb-6 break-words">
          {isEditMode ? (
            <textarea
              className="border border-gray-400 p-2 rounded-md w-full h-80 dark:bg-white"
              name="description"
              value={article.description}
              onChange={handleInputChange}
            />
          ) : (
            article.description
          )}
        </p>
        <div className="prose max-w-none text-gray-800">
          <p>
            <b>
              By{' '}
              {author.pseudo ? author.pseudo || 'Deleted User' : author.pseudo}
            </b>{' '}
            - <i>{article.date}</i>
          </p>
          {isEditMode ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleModifyClick}>Modify</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Article
