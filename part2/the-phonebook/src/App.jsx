import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName
    };
    if (!persons.some(person => person.name === newName)){
      setPersons(persons.concat(person));
      setNewName('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleInputChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p>{person.name}</p>)}
    </div>
    
  )
}

export default App