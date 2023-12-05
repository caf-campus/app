const Home = () => {
  const articles = [
    {
      id: 1,
      title: 'Découverte des cafés du monde',
      author: 'Café Campus',
      content:
        "Aujourd'hui, nous partons à la découverte des cafés du monde entier. Quels sont vos cafés préférés ?",
    },
    {
      id: 2,
      title: 'Les bienfaits du café sur la productivité',
      author: 'Café Campus',
      content:
        'Le café est-il votre compagnon de travail ? Découvrez comment il peut améliorer votre productivité au quotidien.',
    },
    {
      id: 3,
      title: 'Recettes de café originales à essayer chez vous',
      author: 'Café Campus',
      content:
        'Envie de changer votre routine caféinée ? Essayez ces recettes de café créatives et savoureuses à la maison.',
    },
  ]

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col border-2 border-gray-300 p-8">
      <h1 className="text-4xl">Café Campus</h1>
      <p>ici ça tchatche</p>

      <div className="mt-8 w-[60%]">
        {/* Affiche la liste des articles */}
        {articles.map(article => (
          <div
            key={article.id}
            className="bg-white p-6 mb-4 rounded-md shadow-md border border-gray-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-700">{article.content}</p>
            <p className="text-gray-500 text-sm mt-2">Par {article.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
