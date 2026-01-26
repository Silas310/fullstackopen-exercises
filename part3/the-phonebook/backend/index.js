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

app.delete('/api/persons/:id', (req, res) => { // Endpoint to delete a specific phonebook entry by ID
  const id = req.params.id;
  // numbers = numbers.filter(p => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => { // Endpoint to add a new phonebook entry
  // const body = req.body; // get the request body to verify the data before creating a new object


  // if (!body.name) {
  //   return res.status(400).json({ error: 'Name is missing' });
  // }
  // if (!body.number) {
  //   return res.status(400).json({ error: 'Number is missing' });
  // }

  // const nameExists = numbers.find(p => p.name === body.name);

  // if (nameExists) {
  //   return res.status(400).json({ error: 'Name must be unique' });
  // }


  // const newPerson = {
  //   id: (Math.floor(Math.random() * 10000)).toString(),
  //   name: body.name,
  //   number: body.number
  // };


  // numbers = numbers.concat(newPerson);
  // res.json(newPerson);
});

app.listen(PORT, () => { // Start the server
  console.log(`Server running on port ${PORT}`);
});