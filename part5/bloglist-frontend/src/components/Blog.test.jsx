import { describe, test, beforeEach, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

describe('<Blog />', () => {
  let blog
  let mockOnLike
  let mockOnDelete
  const user = { username: 'silascosta', name: 'Silas Costa' }

  beforeEach(() => {
    blog = {
      id: '1',
      title: 'Test Blog 1',
      author: 'Author 1',
      url: 'http://testblog1.com',
      likes: 5,
      user: user // blog needs to have a user property for ownership check
    }

    mockOnLike = vi.fn()
    mockOnDelete = vi.fn()
  })

  const renderBlog = (currentUser = user) => {
    render(
      <MemoryRouter initialEntries={['/blogs/1']}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blogs={[blog]}
                user={currentUser}
                onLike={mockOnLike}
                onDelete={mockOnDelete}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    )
  }

  test('render blog title, url and author', async () => {
    renderBlog()

    const title = screen.getByText('Test Blog 1')
    const url = screen.getByText('http://testblog1.com')
    const author = screen.getByText(/Author 1/)

    expect(title).toBeVisible()
    expect(url).toBeVisible()
    expect(author).toBeVisible()
  })

  test('auth user who are not owner only see like', async () => {
    const anotherUser = { username: 'anotheruser', name: 'Another User' }
    renderBlog(anotherUser)

    const likeButton = screen.getByText('like')
    const removeButton = screen.queryByText('Remove')

    expect(likeButton).toBeVisible()
    expect(removeButton).toBeNull()
  })

  test('owner can see remove button', async () => {
    renderBlog(user)

    const removeButton = screen.queryByText('Remove')

    expect(removeButton).toBeVisible()
  })
})