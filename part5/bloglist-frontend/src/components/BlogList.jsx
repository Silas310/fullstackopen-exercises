import { useState } from 'react'
import Blog from './Blog'

function BlogList({ blogs, onLike }) {
  const [detailsVisibleStatus, setDetailsVisibleStatus] = useState(null)
  

  const changeVisibleDetails = (blogId) => {
    if (detailsVisibleStatus === blogId) {
      setDetailsVisibleStatus(null);
    } else {
      setDetailsVisibleStatus(blogId);
    }
  }

  return (
    <div>
      {blogs.map(blog => (
        <Blog 
        key={blog.id} 
        blog={blog} 
        detailsVisibleStatus={detailsVisibleStatus} 
        changeVisibleDetails={changeVisibleDetails} 
        onLike={onLike}
      />
      ))}
    </div>
  )
}


export default BlogList