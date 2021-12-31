import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Notification from './components/Notification'
import Error from './components/Error'
import axios from 'axios'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setNewSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(i => i.id !== person.id ? i : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(
              `The number for ${person.name} has been changed`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      const numberObject = {
        name: newName,
        number: newNumber
    }

      personService
        .create(numberObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${numberObject.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          console.log(error.response.data)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    if (event.target.value === "") {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }
 
  const handleRemovalOf = (id) => {
    const url = `/api/persons/${id}`
    const deletedPerson = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${deletedPerson.name}`)) {
      axios
        .delete(url)
        .then(message => {
          setMessage(
            `${deletedPerson.name} has been deleted`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

      setPersons(persons.filter(person => 
        person.id !== deletedPerson.id))
      console.log(deletedPerson.id)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter( person => person.name.toLowerCase().includes(
      search.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message}/>
      <Error message={errorMessage}/>

      <Person.Filter search={search} handleSearchChange={handleSearchChange}/>

      <h2>add a new</h2>

      <Person.PersonForm 
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />

      <h2>Numbers</h2>

      {personsToShow.map((person, i) => 
        <Person.Person
          key={i}
          person={person}
          handleRemoval={() => handleRemovalOf(person.id)}/>
      )}
    </div>
  )

}

export default App