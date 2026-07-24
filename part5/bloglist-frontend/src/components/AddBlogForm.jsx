import { useState } from 'react'
import Toggleable from './Toggleable'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button.styles'
import { Input } from './Input.styles'


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
          <Input type="text" name="title" id="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
        </label>
        <label htmlFor="author">
          <Input type="text" name="author" id="author" placeholder="Author" value={formData.author} onChange={handleInputChange} />
        </label>
        <label htmlFor="url">
          <Input type="text" name="url" id="url" placeholder="URL" value={formData.url} onChange={handleInputChange} />
        </label>
        <Button type="submit">create</Button>
      </form>
    </Toggleable>
  )
}

export default AddBlogForm