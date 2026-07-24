import { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import NotificationMessage from './components/NotificationMessage'
import blogService from './services/blogs'
import  { 
  Link, Routes, Route, 
  useNavigate, useParams 
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')

  const navigate = useNavigate()
  
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await axios.post('/api/login', { username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user.data))

      blogService.setToken(user.data.token)
      console.log(user.data.token);
      
      navigate('/') // redirect to home page after login

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
    navigate('/') // redirect to home page after logout
  }

  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)

      newBlog.user = {
        ...user,
        id: typeof newBlog.user === 'string' ? newBlog.user : newBlog.user.id
      }

      setBlogs(blogs.concat(newBlog))
      setNotification(`A new blog "${newBlog.title}" by "${newBlog.author}" added`)
      console.log(newBlog)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (error) {
      setNotification(`Error creating blog: ${error.response.data.error}`)
      console.log(error.response.data.error)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLike = async (blogId) => {
    try {
      const blogToLike = blogs.find(blog => blog.id === blogId) // get the blog
      const updatedBlog = {
        ...blogToLike,
        likes: (blogToLike.likes || 0) + 1,
        user: blogToLike.user.id
      } // update only likes

      const response = await blogService.update(blogId, updatedBlog) // send new blog to backend and get the updated blog
      const returnedBlog = {
        ...response,
        user: blogToLike.user // keep the user object as it was
      }

      setBlogs(blogs.map(blog => blog.id === blogId ? returnedBlog : blog)) // update the frontend state
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (blogId) => {
    // delete from state
    // fetch frontend to delete from backend
    // delete route exists?
    try {
      const deletedBlog = blogs.find(blog => blog.id === blogId)
      if (!deletedBlog) {
        console.error(`Blog with id ${blogId} not found`)
        return
      }

      const confirmDelete = window.confirm(`Are you sure you want to delete the blog "${deletedBlog.title}" by "${deletedBlog.author}"?`)
      if (confirmDelete) {
        const response = await blogService.remove(blogId) // send delete request to backend
        setBlogs(blogs.filter(blog => blog.id !== blogId)) // update frontend state

        return response
      }
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => { // check if user is logged in by local storage and set user state accordingly
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [navigate]) // add navigate to dependency array to avoid warning

  useEffect(() => { // fetch blogs from backend if user is logged in
    try {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }, [])

  return (
    <div>
      <header>
        <div style={{ display: "flex", listStyle: "none" }}>
          <span>{<Link to="/">blogs</Link>}</span>
          <span style={{ marginLeft: "10px" }}>
            {user && <Link to="/create">new blog</Link>}
          </span>
          <span style={{ marginLeft: "10px" }}>
            {!user ? (
              <Link to="/login">login</Link>
            ) : (
              <span>
                <button onClick={handleLogout}>logout</button>
              </span>
            )}
          </span>
        </div>
      </header>
      <NotificationMessage message={notification}/>
      <Routes>
        <Route
          path="/create"
          element={
            <AddBlogForm
              onAddBlog={handleAddBlog}
              user={user}
            />
          }
        />
        <Route 
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              onLike={handleLike}
              onDelete={handleDelete}
              user={user}
              isOwner={user && blogs.find(blog => blog.id === useParams().id)?.user?.username === user.username}
            />
          }
        />
        <Route
          path="/"
          element={
            <BlogList
              blogs={sortedBlogs}
              onLike={handleLike}
              onDelete={handleDelete}
              user={user}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App