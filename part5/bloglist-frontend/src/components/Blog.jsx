import { useParams } from 'react-router-dom'
import styled from 'styled-components'


const BlogContainer = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
`

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  margin-top: 12px;
`

const BaseButton = styled.button`
  background-color: #ffffff;
  font-size: 1.05rem;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`

const LikeButton = styled(BaseButton)`
  border: 1.5px solid #2563eb;
  color: #2563eb;
`

const RemoveButton = styled(BaseButton)`
  border: 1.5px solid #dc2626;
  color: #dc2626;
`


function Blog({
  blogs,
  detailsVisibleStatus,
  changeVisibleDetails,
  onLike,
  onDelete,
  user,
}) {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const isOwner = user && blog?.user?.username === user.username

  const handleLike = async () => {
    if (onLike && blog) await onLike(blog.id)
  }

  const handleDelete = async () => {
    try {
      if (blog) await onDelete(blog.id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <BlogContainer>
      <h2>{blog?.title}</h2>
      <p>by '{blog?.author}'</p>
      <a href={blog?.url} target="_blank" rel="noopener noreferrer">
        {blog?.url}
      </a>

      <ActionsRow>
        <p style={{ margin: 0 }}>{blog?.likes ?? 0} likes</p>

        {user && (
          <LikeButton onClick={handleLike}>like</LikeButton>
        )}

        {isOwner && (
          <RemoveButton onClick={handleDelete}>Remove</RemoveButton>
        )}
      </ActionsRow>
    </BlogContainer>
  )
}

export default Blog