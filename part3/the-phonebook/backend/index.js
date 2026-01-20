import express from 'express';
import morgan from 'morgan';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(morgan('tiny')); // Middleware for logging HTTP requests
morgan.token('body', (req, res) => JSON.stringify(req.body)); // Custom token to log request body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')); // Use custom format including body

let numbers = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => { // Endpoint to get all phonebook entries
  res.json(numbers);
});

app.get('/info', (req, res) => { // Endpoint to get phonebook info
  const info = `<p>Phonebook has info for ${numbers.length} people</p><p>${new Date()}</p>`;
  res.send(info);
});

app.get('/api/persons/:id', (req, res) =>{ // Endpoint to get a specific phonebook entry by ID
  const id = req.params.id;
  const person = numbers.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => { // Endpoint to delete a specific phonebook entry by ID
  const id = req.params.id;
  numbers = numbers.filter(p => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => { // Endpoint to add a new phonebook entry
  const body = req.body; // get the request body to verify the data before creating a new object


  if (!body.name) {
    return res.status(400).json({ error: 'Name is missing' });
  }
  if (!body.number) {
    return res.status(400).json({ error: 'Number is missing' });
  }

  const nameExists = numbers.find(p => p.name === body.name);

  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }


  const newPerson = {
    id: (Math.floor(Math.random() * 10000)).toString(),
    name: body.name,
    number: body.number
  };


  numbers = numbers.concat(newPerson);
  res.json(newPerson);
});

app.listen(PORT, () => { // Start the server
  console.log(`Server running on port ${PORT}`);
});