import Comment from '../components/Comment'

const Home = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center flex-col">
        <h1 className="text-4xl">Café Campus</h1>
        <p>ici ça tchatche</p>
        <Comment></Comment>
      </div>
    </>
  )
}

export default Home
