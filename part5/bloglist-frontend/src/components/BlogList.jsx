import { useState } from 'react'


function BlogList({ blogs }) {
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
        <div key={blog.id} style={{ border: '1px solid blue'  }}>
          <p style={{display: 'inline-block', marginRight: '10px'}}>{blog.title}</p>
          <button onClick={ () => changeVisibleDetails(blog.id) }>{detailsVisibleStatus === blog.id ? 'hide' : 'view'}</button>
          {detailsVisibleStatus === blog.id && ( // accordion mode
            <div>
              <p>Author: {blog.author}</p>
              <p>URL: {blog.url}</p>
              <p>Likes: {blog.likes}</p>
            </div>  
          )}
        </div>
      ))}
    </div>
  )
}


export default BlogList