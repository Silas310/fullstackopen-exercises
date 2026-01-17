import express from 'express';
const app = express();
const PORT = 3001;


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

app.listen(PORT, () => { // Start the server
  console.log(`Server running on port ${PORT}`);
});