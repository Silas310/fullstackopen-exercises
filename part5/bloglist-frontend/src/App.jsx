import { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import NotificationMessage from './components/NotificationMessage'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')

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
      setNotification(`Error logging in: ${error.response.data.error}`)
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
      setNotification(`A new blog "${newBlog.title}" by "${newBlog.author}" added`)
      console.log(newBlog);
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (error) {
      setNotification(`Error creating blog: ${error.response.data.error}`)
      console.log(error.response.data.error);
      setTimeout(() => {
        setNotification('')
      }, 5000)
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
      <h2>blogs</h2>
      <NotificationMessage message={notification} />
      {user && (
        <div>
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