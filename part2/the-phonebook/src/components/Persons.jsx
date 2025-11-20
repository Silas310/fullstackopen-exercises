const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <>
      {personsToShow.map(person => (
        <div key={person.id} style={{display: 'flex'}}> 
          <p>{person.name} {person.number}</p>
          <button style={{marginLeft: '10px'}} onClick={() => deletePerson({id: person.id, name: person.name})}>delete</button>
        </div>
      ))}
    </>
  )
}

export default Persons