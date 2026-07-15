import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />) // renderize Note

  // find the element with the text content of the note
  const element = screen.getByText('Component testing is done with react-testing-library')
  screen.debug(element) // print the element to the console
  // assert that the element is defined and exists
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  const mockHandler = vi.fn() // create a mock function to simulate the event handler

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup() // create a user event instance to simulate interactions
  const button = screen.getByText('make not important')
  await user.click(button) // click event

  expect(mockHandler.mock.calls).toHaveLength(1) // assert that the mock function was called once
})