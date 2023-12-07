import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReadData, getUserByID, deleteArticle } from '../../core'

const TableArticlesComponent = () => {
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
    <div className="overflow-x-auto flex-grow pl-6">
      <p className="font-bold">
        Articles : {articles.length}{' '}
        <Link to="/articlecreation">
          <button className="btn btn-primary mx-2">Add</button>
        </Link>
      </p>
      <table className="mt-2 table table-xs">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Date</th>
            <th>Id</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.titre}</td>
              <td>{authors[article.auteur].pseudo}</td>
              <td>{article.date}</td>
              <td>{article.id}</td>
              <td>
                {article.description.length > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => deleteArticle(article.id)}
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

export default TableArticlesComponent
