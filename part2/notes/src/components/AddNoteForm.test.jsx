import { render, screen } from '@testing-library/react'
import NoteForm from './AddNoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn() // placeholder function to simulate the createNote prop
  const user = userEvent.setup() // set user

  render(<NoteForm createNote={createNote} />) // render the component

  const input = screen.getByRole('textbox') // get the input field
  const sendButton = screen.getByText('save') // get the send button

  await user.type(input, 'testing a form...') // simulate typing into the input field
  await user.click(sendButton) // simulate clicking the send button

  expect(createNote.mock.calls).toHaveLength(1) // check that the createNote function was called once
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...') // access the first argument of the first call to createNote and check its content
})