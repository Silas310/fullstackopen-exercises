function Blog({ blog, detailsVisibleStatus, changeVisibleDetails, onLike, onDelete }) {
  const handleLike = async () => {
    // use setLikes and prop function to update the likes in the backend
    await onLike(blog.id)
  }


  const handleDelete = async () => {
    try {
      await onDelete(blog.id)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div key={blog.id} style={{ border: '1px solid blue'  }}>
      <p style={{ display: 'inline-block', marginRight: '10px' }}>{blog.title} {blog.author}</p>
      <button onClick={ () => changeVisibleDetails(blog.id) }>{detailsVisibleStatus === blog.id ? 'hide' : 'view'}</button>
      {detailsVisibleStatus === blog.id &&
    ( // accordion mode
      <div>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <div style={{ display:'flex', alignItems: 'center', gap: '10px' }}>
          <p>Likes: {blog.likes}</p>
          <button onClick={handleLike}>like</button>
        </div>
        <button onClick={handleDelete}>Remove</button>
      </div>
    )}
    </div>
  )}

export default Blog