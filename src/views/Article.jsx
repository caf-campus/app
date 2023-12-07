import { useEffect, useState } from 'react'
import { getArticleByID, getUserByID } from '../core'

const Article = () => {
  const [article, setArticle] = useState(null)
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const articleId = urlParams.get('id')

    if (articleId) {
      getArticleByID(articleId).then(response => {
        setArticle(response)
        getUserByID(response.auteur).then(author => {
          setAuthor(author)
        })
      })
    }
  }, [])

  if (!article) {
    return null
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl m-10">
        <h1 className="text-4xl font-bold mb-4 text-grey-700">
          {article.titre}
        </h1>
        <p className="text-gray-600 mb-6">{article.description}</p>
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
