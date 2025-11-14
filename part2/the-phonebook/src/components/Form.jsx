const Form = ({ 
  newName, 
  newNumber, 
  handleNameChange, 
  handleNumberChange, 
  addNewPerson 
}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        <p>name: <input onChange={handleNameChange} value={newName}/></p>
        <p>phone number: <input onChange={handleNumberChange} value={newNumber}/></p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form