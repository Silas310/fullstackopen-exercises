import { useState } from 'react'


function AddBlogForm({ onAddBlog }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddBlog(formData)
    setFormData({
      title: '',
      author: '',
      url: ''
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }


  return (
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
  )
}

export default AddBlogForm