import { useEffect, useState } from 'react'
import SearchFilter from './components/SearchFilter';
import Form from './components/Form';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getPersons()
    .then(reponse => {
      setPersons(reponse.data);
    })
  } , [])

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
      number: newNumber
    };
   if (newName.trim() === '') {
      alert('Name cannot be empty!');
      return; // Para a execução da função
    }
    if (!persons.some(person => person.name === newName)){
      personService.createPerson(person).then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      });
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