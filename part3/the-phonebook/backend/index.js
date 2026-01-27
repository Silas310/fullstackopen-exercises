import { Person } from './mongo.js';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(morgan('tiny')); // Middleware for logging HTTP requests
app.use(express.static('dist')); // Serve static files from the 'dist' directory
morgan.token('body', (req, res) => JSON.stringify(req.body)); // Custom token to log request body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')); // Use custom format including body

app.get('/api/persons', (req, res) => { // Endpoint to get all phonebook entries
  Person.find().then(persons => {
    res.json(persons);
  });
});

app.get('/info', (req, res) => { // Endpoint to get phonebook info
  const info = Person.countDocuments({}).then(count => {
    return `Phonebook has info for ${count} people<br><br>${new Date()}`;
  }).then(info => {
    res.send(info);
  });
});

app.get('/api/persons/:id', (req, res) =>{ // Endpoint to get a specific phonebook entry by ID
  const id = Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

app.delete('/api/persons/:id', (req, res) => { // delete a specific phonebook entry by ID
  Person.findByIdAndDelete(req.params.id).then( result => {
    if(result) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  })
  .catch(error => {
    console.log(error);
    res.status(400).send({ error: 'malformatted id' });
  });
});

app.post('/api/persons', (req, res) => { // Endpoint to add a new phonebook entry
  const body = req.body;
  const newPerson = new Person({
    name: body.name,
    number: body.number
  });

  newPerson.save().then(savedPerson => {
    res.json(savedPerson);
  })
});

app.listen(PORT, () => { // Start the server
  console.log(`Server running on port ${PORT}`);
});