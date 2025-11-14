import { useState } from 'react'
import SearchFilter from './components/SearchFilter';
import Form from './components/Form';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
   if (newName.trim() === '') {
      alert('Name cannot be empty!');
      return; // Para a execução da função
    }
    if (!persons.some(person => person.name === newName)){
      setPersons(persons.concat(person));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />
      <Form
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
     
      <Persons personsToShow={personsToShow} />
    </div>
    
  )
}

export default App