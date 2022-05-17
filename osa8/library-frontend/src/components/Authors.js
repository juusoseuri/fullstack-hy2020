import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"

import { EDIT_BIRTHYEAR } from "../queries"

const AuthorForm = (props) => {
  const [name, setName] = useState(props.authors[0].name)
  const [birthyear, setBirthyear] = useState('')
  console.log('name', name)

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const [changeBirthyear, result] = useMutation(EDIT_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()
    const setBornTo = birthyear

    changeBirthyear({ variables: { name, setBornTo } })
    setName(props.authors[0].name)
    setBirthyear('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('Person not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>Change birthyear</h2>
      <form onSubmit={submit}>
        <label>
          Pick the person
          <select value={name} onChange={handleChange}>
            {props.authors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <div>
          birthyear{' '}
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(parseInt(target.value))}
          />
        </div>
        <button type="submit">change birthyear</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.authors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm authors={authors}/>
    </div>
  )
}

export default Authors
