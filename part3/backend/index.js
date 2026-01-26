require('dotenv').config();
const express = require('express');
const app = express();
const Note = require('./models/note');

app.use(express.static('dist'));
app.use(express.json());


app.get('/', (request, response) => { // root endpoint
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => { // all notes endpoint
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => { // single note endpoint
  Note.findById(request.params.id).then(note => { // use mongoose model to find note by ID
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error)) // pass error to error handling middleware
})

app.delete('/api/notes/:id', (request, response, next) => { // delete note endpoint
  Note.findByIdAndRemove(request.params.id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error)) // pass error to error handling middleware
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => { // create note endpoint
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const errorHandler = (error, request, response, next) => {  // error handling middleware. Should be the last loaded middleware. 
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})