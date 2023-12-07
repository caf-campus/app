import { useEffect, useState } from 'react'
import { getArticleByID, getUserByID } from '../core'

const Article = () => {
  const [article, setArticle] = useState([])
  const [author, setAuthor] = useState({})

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id') // Remplacez 'id' par le nom de votre paramètre

    // Utilisez l'ID pour obtenir les données de l'article
    getArticleByID(id).then(article => {
      setArticle(article)
      // Récupérer l'auteur de l'article
      getUserByID(article.auteur).then(user => {
        setAuthor(user)
      })
    })
  }, [])

  return (
    <div className="bg-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md min-w-[70%] max-w-[70%] m-10">
        <h1 className="text-4xl font-bold mb-4 text-grey-700">
          {article.titre}
        </h1>
        <p className="text-gray-600 mb-6 break-words">{article.description}</p>
        <div className="prose max-w-none text-gray-800">
          <p>
            <b>Par {author.pseudo}</b> - <i>{article.date}</i>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Article
