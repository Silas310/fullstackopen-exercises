import { useState } from 'react'
import Toggleable from './Toggleable'
import { useNavigate } from 'react-router-dom'

function AddBlogForm({ onAddBlog, user }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddBlog(formData)
    setFormData({
      title: '',
      author: '',
      url: ''
    })
    navigate('/')
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }


  return (
    <Toggleable buttonLabel="create new blog">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <h2>create new</h2>
        <label htmlFor="title">
          <input type="text" name="title" id="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
        </label>
        <label htmlFor="author">
          <input type="text" name="author" id="author" placeholder="Author" value={formData.author} onChange={handleInputChange} />
        </label>
        <label htmlFor="url">
          <input type="text" name="url" id="url" placeholder="URL" value={formData.url} onChange={handleInputChange} />
        </label>
        <button type="submit">create</button>
      </form>
    </Toggleable>
  )
}

export default AddBlogForm