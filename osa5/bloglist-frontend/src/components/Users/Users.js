import React from 'react'
import { Link } from 'react-router-dom'
//import User from './User/User'

const Users = ({ usersAndBlogCount }) => {
  const headerStyle = {
    fontWeight: 'bold',
    margin: 0,
    width: 130
  }

  return(
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <p style={headerStyle}>Name</p>
            </td>
            <td>
              <p style={headerStyle}>Number of blogs</p>
            </td>
          </tr>
          {usersAndBlogCount.map( user => (
            <tr key={user.username}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users