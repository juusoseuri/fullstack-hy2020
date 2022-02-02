import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const itemToChange = state.find(n => n.id === id)
      const changed = {...itemToChange, votes: itemToChange.votes + 1}
      return (
        state.map(item => (
          item.id !== id ? item : changed
        ))
        .sort((a, b) => b.votes - a.votes)
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  } 
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const itemToChange = anecdotes.find(n => n.id === id)
    await anecdoteService.update(id, {...itemToChange, votes: itemToChange.votes + 1})
    dispatch({
      type: 'VOTE',
      data: {id}
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes.sort((a, b) => b.votes - a.votes),
    })   
  }
}
export default reducer