import { describe, test, beforeEach, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './AddBlogForm'
import { MemoryRouter } from 'react-router-dom'

describe('<AddBlogForm />', () => {
  let mockAddBlog

  beforeEach(() => {
    mockAddBlog = vi.fn()
  })

  test('event handler is called with the right details when a new blog is created', async () => {
    render(
      <MemoryRouter>
        <Blog onAddBlog={mockAddBlog} />
      </MemoryRouter>
    );

    const user = userEvent.setup()

    const createNewBlogButton = screen.getByText('create new blog')
    await user.click(createNewBlogButton) // open the form

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')
    const createButton = screen.getByText('create')

    // simulate events
    await user.type(titleInput, 'Testing a form...')
    await user.type(authorInput, 'John Doe')
    await user.type(urlInput, 'http://testblog.com')
    await user.click(createButton)

    // check n called times and with the right params
    expect(mockAddBlog).toHaveBeenCalledTimes(1)
    expect(mockAddBlog).toHaveBeenCalledWith({
      title: 'Testing a form...',
      author: 'John Doe',
      url: 'http://testblog.com'
    })
  })
})