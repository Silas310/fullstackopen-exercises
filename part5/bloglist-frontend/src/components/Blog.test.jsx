import { describe, test, beforeEach, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let mockChangeVisibleDetails

  beforeEach(() => {
    blog = {
      id: '1',
      title: 'Test Blog 1',
      author: 'Author 1',
      url: 'http://testblog1.com',
      likes: 5
    }

    mockChangeVisibleDetails = vi.fn()
  })

  test('renders title and author initially', () => {
    render(
      <Blog 
        blog={blog} 
        detailsVisibleStatus={null} 
        changeVisibleDetails={mockChangeVisibleDetails} 
      />
    )

    const text = screen.getByText('Test Blog 1 Author 1')
    expect(text).toBeVisible()
  })

  test('does not render url and likes initially', () => {
    render(
      <Blog 
        blog={blog} 
        detailsVisibleStatus={null} 
        changeVisibleDetails={mockChangeVisibleDetails} 
      />
    )

    const urlElement = screen.queryByText('http://testblog1.com')
    const likesElement = screen.queryByText('Likes: 5')

    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })

  test('checks if url and likes are displayed when the blog is clicked', async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      <Blog 
        blog={blog} 
        detailsVisibleStatus={null} 
        changeVisibleDetails={mockChangeVisibleDetails} 
      />
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // fn called with the correct param(blog id)
    expect(mockChangeVisibleDetails).toHaveBeenCalledWith('1')

    rerender(
      <Blog 
        blog={blog} 
        detailsVisibleStatus="1" 
        changeVisibleDetails={mockChangeVisibleDetails} 
      />
    )

    // exact = false is used to evade formatting issues.
    const urlElement = screen.getByText('http://testblog1.com', { exact: false })
    const likesElement = screen.getByText('Likes: 5')

    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
  })

  test('handler called twice when the blog is liked twice', async () => {
    const mockOnLike = vi.fn()

    render(
      <Blog 
        blog={blog} 
        detailsVisibleStatus="1" 
        changeVisibleDetails={mockChangeVisibleDetails} 
        onLike={mockOnLike}
      />
    )

    await userEvent.click(screen.getByText('like'))
    await userEvent.click(screen.getByText('like'))

    expect(mockOnLike).toHaveBeenCalledTimes(2)
  })
})