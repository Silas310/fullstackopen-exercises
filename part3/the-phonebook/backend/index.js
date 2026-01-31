import dotenv from 'dotenv';
dotenv.config();

import { Person } from './mongo.js';
import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(morgan('tiny')); // Middleware for logging HTTP requests
app.use(express.static('dist')); // Serve static files from the 'dist' directory
morgan.token('body', (req, res) => JSON.stringify(req.body)); // Custom token to log request body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')); // Use custom format including body


app.get('/api/persons', (req, res) => { // get all phonebook entries
  Person.find().then(persons => {
    res.json(persons);
  });
});

app.get('/info', (req, res) => { // get phonebook info
  const info = Person.countDocuments({}).then(count => {
    return `Phonebook has info for ${count} people<br><br>${new Date()}`;
  }).then(info => {
    res.send(info);
  })
  .catch(error => {next(error)});
});

app.get('/api/persons/:id', (req, res, next) =>{ // get a specific phonebook entry by ID
  const id = Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  })
  .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => { // update specific id
  const body = req.body; // Endpoint to update a specific phonebook entry by ID
  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(
    req.params.id, 
    person, 
    { new: true, runValidators: true, context: 'query' }
  )
  .then(updatedPerson => {
    if (updatedPerson) {
      res.json(updatedPerson);
    } else {
      res.status(404).end();
    }
  })
  .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => { // delete a specific phonebook entry by ID
  Person.findByIdAndDelete(req.params.id)
  .then( result => {
    if(result) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
  .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => { // add a new phonebook entry
  const body = req.body;
  const newPerson = new Person({
    name: body.name,
    number: body.number
  });

  newPerson.save().then(savedPerson => {
    res.json(savedPerson);
  })
  .catch(error => next(error));
});

const errorHandler = (error, req, res, next) => { // Error handling middleware
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler); // Use the error handling middleware

app.listen(PORT, () => { // Start the server
  console.log(`Server running on port ${PORT}`);
});