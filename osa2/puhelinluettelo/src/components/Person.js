import React from 'react'

const Person = ({person, handleRemoval }) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={handleRemoval}>delete</button>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addNumber}>
        <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      <form>
        <div>filter shown with <input value={props.search} onChange={props.handleSearchChange}/></div>
      </form>
    </div>
  )
}

const exp = {
  PersonForm,
  Filter,
  Person
}

export default exp