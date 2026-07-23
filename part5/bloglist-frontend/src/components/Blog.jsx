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
  const blog = blogs.find(blog => blog.id === id)
  

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
      <h2>{blog?.title}</h2>
      <p>{blog?.url}</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>likes {blog?.likes} </p>
        {user && (
          <button
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={handleLike}
          >
            like
          </button>
        )}
      </div>
      <p>Added by '{blog?.author}'</p>
      {isOwner && (
        <button
          style={{ cursor: "pointer", marginTop: "10px" }}
          onClick={handleDelete}
        >
          Remove
        </button>
      )}
    </div>
  );}

export default Blog