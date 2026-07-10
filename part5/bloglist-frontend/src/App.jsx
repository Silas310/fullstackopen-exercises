import { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await axios.post('/api/login', { username, password })
    blogService.setToken(user.data.token)

    console.log(user.data)
    setUser(user.data)
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  return (
    <div>
      {user && <h2>blogs</h2>}
      {user && <p>{user.name} logged in</p>}
      {!user && <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />}
      {user && <BlogList blogs={blogs} />}
    </div>
  )
}

export default App