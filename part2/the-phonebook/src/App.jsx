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
    const existingPerson = persons.find(person => person.name === newName);

   if (newName.trim() === '') {
      alert('Name cannot be empty!');
      return; 
    }
    
    if (!existingPerson) {
      personService.createPerson(person).then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      });
    } else {
        const updatedPerson = { ...existingPerson, number: newNumber };

        const replace = window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        );

        if (replace) {
          personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data));
            setNewName('');
            setNewNumber('');
          })
          .catch( () => {
            alert(`Information of ${existingPerson.name} has already been removed from server`);
              setPersons(persons.filter(p => p.id !== existingPerson.id));
          });
        }
      }
    }
  

  const deletePerson = (id) => {
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter(p => p.id !== id));
    })    
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
     
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
    
  )
}

export default App