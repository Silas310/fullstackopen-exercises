import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  beforeEach(() => {
    const blog =
      {
        id: '1',
        title: 'Test Blog 1',
        author: 'Author 1',
        url: 'http://testblog1.com',
        likes: 5
      }

    render(<Blog blog={blog}></Blog>)
  })

  test('renders title and author initially', () => {
    const text = screen.getByText('Test Blog 1 Author 1');

    expect(text).toBeVisible();
  })

  test('does not render url and likes initially', () => {
    const urlElement = screen.queryByText('http://testblog1.com');
    const likesElement = screen.queryByText('Likes: 5');

    expect(urlElement).not.toBeInTheDocument();
    expect(likesElement).not.toBeInTheDocument();
  })
})