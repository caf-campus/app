import React from 'react';

const Article = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full mt-28">
        <h1 className="text-4xl font-bold mb-4 text-indigo-700">Lorem ipsum dolor sit amet</h1>
        <p className="text-gray-600 mb-6">Consectetur adipiscing elit. Praesent suscipit arcu velit.</p>
        <div className="prose max-w-none text-gray-800">
          <p>
            Contenu de l'article. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Praesent suscipit arcu velit. Blablabla...
          </p>
          <p>
            Ajouter plus de contenu ici.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Article;
