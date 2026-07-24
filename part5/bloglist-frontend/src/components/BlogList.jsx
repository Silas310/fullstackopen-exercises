import { useState } from 'react'
import { Link } from 'react-router-dom'

function BlogList({ blogs, onLike, onDelete, user }) {
  const [detailsVisibleStatus, setDetailsVisibleStatus] = useState(null)
  

  const changeVisibleDetails = (blogId) => {
    if (detailsVisibleStatus === blogId) {
      setDetailsVisibleStatus(null)
    } else {
      setDetailsVisibleStatus(blogId)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`} key={blog.id}>
              {blog.title} by: '{blog.author}'
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default BlogList