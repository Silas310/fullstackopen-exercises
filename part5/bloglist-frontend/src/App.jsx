import { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await axios.post('/api/login', { username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user.data))

      blogService.setToken(user.data.token)
      console.log(user.data)

      setUser(user.data)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(`${error.response.data.error}`)
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }


  useEffect(() => { // check if user is logged in by local storage and set user state accordingly
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => { // fetch blogs from backend if user is logged in
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  return (
    <div>
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <AddBlogForm onAddBlog={handleAddBlog} />
          <BlogList blogs={blogs} />
        </div>
      )}
      {!user && <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />}
    </div>
  )
}

export default App