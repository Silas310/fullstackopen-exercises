import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import styled from 'styled-components'

function AddNoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('')
  const navigate = useNavigate()

  const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid Chocolate;
    border-radius: 3px;
  `;

  const Input = styled.input`
    margin: 0.25em;
    width: 300px;
  `;


  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })
    navigate('/notes')
    setNewNote('')
  }


  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <Input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
          label="note content"
          placeholder="write note content here"
        />
        <div>
          <Button type="submit">
            save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddNoteForm;