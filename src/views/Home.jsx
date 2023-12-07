import { useEffect, useState } from 'react'
import { ReadData, getUserByID } from '../core'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [authors, setAuthors] = useState({})

  useEffect(() => {
    ReadData('articles')
      .then(data => {
        const articlesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }))

        // Récupérer tous les auteurs
        return Promise.all(
          articlesArray.map(article =>
            getUserByID(article.auteur).then(author => ({
              [article.auteur]: author,
            })),
          ),
        ).then(authorsArray => {
          const authorsObject = Object.assign({}, ...authorsArray)
          setArticles(articlesArray)
          setAuthors(authorsObject)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col p-8">
      <h1 className="text-4xl">Café Campus</h1>
      <p>ici ça tchatche</p>

      <div className="mt-8 w-[60%]">
        {articles.map(article => (
          <a href={`article?id=${article.id}`} key={article.id}>
            <div className="bg-white p-6 mb-4 rounded-md shadow-md border border-gray-300">
              <h2 className="text-2xl font-semibold mb-2">{article.titre}</h2>
              <p className="text-gray-700">
                {article.description.length > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </p>
              {authors[article.auteur] && (
                <p className="text-gray-500 text-sm mt-2">
                  Par {authors[article.auteur].pseudo} - <i>{article.date}</i>
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Home
