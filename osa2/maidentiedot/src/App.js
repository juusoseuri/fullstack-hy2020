import './App.css';
import axios from 'axios'
import React, { useState } from 'react'

const Search = (props) => {
  return (
    <div>
      <form>
        <div>find countries <input value={props.search} onChange={props.handleSearchChange}/></div>
      </form>
    </div>
  )
}

const Languages = (props) => {
  return (
    <div>
      <ul>
        {props.languages.map((language, i) =>
        <li key={i}>
          <p>{language.name}</p>
        </li>
        )}
      </ul>
    </div>
  )
}

const SearchResults = (props) => {

  if (props.search.isEmpty) {
    return (
      <div>
        <p>No results</p>
      </div>
    )
  } else if (props.results.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (props.results.length === 1) {
    return (
      <div>
        {props.results.map((country, i ) => 
          <dl key={i}>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2>Languages</h2>
            <Languages languages={country.languages}/>
            <img src={country.flag} alt="flag" width="150" heigth="300"/>
            </dl>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {props.results.map((country, i ) => 
          <dl key={i}>
            <p>
              {country.name}
              <button type="button" value={country.name} onClick={props.handleClick}>show</button>
            </p>
          </dl>
        )}
      </div>
    )
  }

}

const App = () => {
  const countryPromise = axios.get('https://restcountries.eu/rest/v2/all')
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)

    countryPromise.then(response => {
      console.log('promise fulfilled')
      setResults(response.data.filter(country => 
        country.name.toLowerCase().includes(
          event.target.value.toLowerCase()
        )))
    })
  }

  const handleClick = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    
    countryPromise.then(response => {
      console.log('promise fulfilled')
      setResults(response.data.filter(country => 
        country.name.toLowerCase().includes(
          event.target.value.toLowerCase()
        )))
    })
  }
  

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange}/>
      <SearchResults search={search} results={results} handleClick={handleClick}/>
    </div>
  )

}

export default App;
