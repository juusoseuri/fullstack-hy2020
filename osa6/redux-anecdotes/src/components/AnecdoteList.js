import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showMessage } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteList = () => {


  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdoteVoted = anecdotes.find(n => n.id === id)
    dispatch(showMessage(`Voted anecdote: ${anecdoteVoted.content}`, 3))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList