import { useState, useEffect } from 'react'
import { createComment } from '../core'
import { useNavigate } from 'react-router-dom'

const Comment = () => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const newComment = message => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    createComment({
      author: user.email,
      message,
    })
  }

  useEffect(() => {
    const response = sessionStorage.getItem('user')
    if (!response) {
      navigate('/login')
      return
    }
  }, [navigate])

  return (
    <>
      <form
        className="flex flex-col space-y-5"
        onSubmit={e => {
          e.preventDefault()
          newComment(comment)
        }}
      >
        <div className="flex flex-col border border-black p-2 rounded-xl">
          <h1 className="text-xl text-center">Comment</h1>
          <input
            onChange={e => setComment(e.target.value)}
            className="px-4 py-1 font-Inter text-gray-500 rounded-full bgbox h-10 border border-gray-500"
            type="text"
            placeholder="Your comment"
          />
          <button className="mt-5 border border-black text-black rounded-full font-Anton bg-gray-300 py-2 px-5">
            submit
          </button>
        </div>
      </form>
    </>
  )
}

export default Comment
