import { useParams } from 'react-router-dom'


function Blog({
  blogs, 
  detailsVisibleStatus, 
  changeVisibleDetails, 
  onLike, 
  onDelete, 
  user,
}) {
  const id = useParams().id
  const isOwner = user && blogs.find(blog => blog.id === id)?.user?.username === user.username
  const note = blogs.find(blog => blog.id === id)
  console.log(note);
  

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
    <div>
      <h2>{note?.title}</h2>
      <p>{note?.url}</p>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <p>likes {note?.likes} </p>
        <button 
        style={{ cursor: 'pointer', marginLeft: '10px' }}
        onClick={handleLike}>
          like
        </button>
      </div>
      <p>Added by '{note?.author}'</p>
      {isOwner && (
        <button 
          style={{ cursor: 'pointer', marginTop: '10px' }}
          onClick={handleDelete}>
          Remove
        </button>
      )}
    </div>
    // <div key={blog.id} style={{ border: '1px solid blue'  }}>
    //   <p style={{ display: 'inline-block', marginRight: '10px' }}>{blog.title} {blog.author}</p>
    //   <button onClick={ () => changeVisibleDetails(blog.id) }>{detailsVisibleStatus === blog.id ? 'hide' : 'view'}</button>
    //   {detailsVisibleStatus === blog.id &&
    // ( // accordion mode
    //   <div>
    //     <p>Author: {blog.author}</p>
    //     <p>URL: {blog.url}</p>
    //     <div style={{ display:'flex', alignItems: 'center', gap: '10px' }}>
    //       <p>Likes: {blog.likes}</p>
    //       <button onClick={handleLike}>like</button>
    //     </div>
    //     {user.username === blog.user?.username && (
    //       <button onClick={handleDelete}>Remove</button>
    //     )}
    //   </div>
    // )}
    // </div>
  )}

export default Blog