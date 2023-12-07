/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '../core'
import { auth } from '../firebase'

const ArticleCreation = () => {
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const createArticles = () => {
    const article = {
      titre: titre,
      description: description,
      date:
        new Date().toLocaleDateString('fr-FR') +
        ' ' +
        new Date().toLocaleTimeString(),
      auteur: auth.currentUser.uid,
    }
    createArticle(article, navigate)
  }

  const handleSubmit = e => {
    e.preventDefault()
    createArticles({ titre, description }, navigate)
  }

  return (
    <div className="h-screen w-full flex flex-col text-black space-y-10 justify-center items-center bgcolor">
      <h1 className="w-fit text-4xl font-Rollicker dark:text-white">
        Création Article
      </h1>
      <div className="flex w-[30%] flex-col space-y-20">
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label
              className="font-Inter font-semibold dark:text-white"
              htmlFor="titre"
            >
              Titre de l'article
            </label>
            <input
              id="titre"
              value={titre}
              onChange={e => setTitre(e.target.value)}
              placeholder="Titre de l'article"
              className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className="font-Inter font-semibold dark:text-white"
              htmlFor="description"
            >
              Description de l'article
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description de l'article"
              className="px-4 py-1 font-Inter text-gray-500 rounded bgbox h-30 border border-gray-500"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="mt-5 w-[50%] border border-black text-black rounded-full font-Anton bg-gray-300 py-2 px-5"
              type="submit"
            >
              Ajouter l'article
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ArticleCreation
