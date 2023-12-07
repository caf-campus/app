import { useEffect, useState } from 'react'
import { ReadData, getUserByID } from '../core'
import { Link } from 'react-router-dom'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [authors, setAuthors] = useState({})

  useEffect(() => {
    ReadData('articles')
      .then(async data => {
        const articlesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }))

        // Récupérer tous les auteurs
        const authorsArray = await Promise.all(
          articlesArray.map(article =>
            getUserByID(article.auteur).then(author => ({
              [article.auteur]: author,
            })),
          ),
        )
        const authorsObject = Object.assign({}, ...authorsArray)
        setArticles(articlesArray)
        setAuthors(authorsObject)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className="h-screen bg-white w-full flex justify-center items-center flex-col p-8">
      <h1 className="text-4xl bold text-neutral-800">Derniers articles</h1>
      <p>ici ça tchatche</p>

      <div className="h-full mt-8 w-[80%] flex flex-wrap space-x-5">
        {articles.map(article => (
          <Link
            className="w-[30%] h-[30%]"
            to={`article?id=${article.id}`}
            key={article.id}
          >
            <div className="h-full bg-white p-6 mb-4 rounded-md shadow-md border border-gray-300">
              <h2 className="text-2xl font-semibold mb-2">{article.titre}</h2>
              <p className="text-gray-700 w-full break-words">
                {article.description.length > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Par {authors[article.auteur].pseudo} - <i>{article.date}</i>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
