import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
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
      setPersons(persons.concat(person));
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
          phone number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
    
  )
}

export default App