import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const BestAnecdote = (props) => {
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const points = [0, 0, 0, 0, 0, 0]

const copy = [...points]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [hasPoints, setPoints] = useState(0)
  let i = copy.indexOf(Math.max(...copy))


  const handleNextClick = () => {
    const nextSelect = Math.floor( Math.random() * anecdotes.length )
    setSelected(nextSelect)
    setPoints(copy[nextSelect])
  }

  const handleVoteClick = () => {
    copy[selected] += 1
    setPoints(hasPoints + 1)
  }

  return (
    <div>
      <Anecdote votes={hasPoints} anecdote={anecdotes[selected]}/>
      <Button onClick={handleNextClick} text='next anecdote'/>
      <Button onClick={handleVoteClick} text='vote'/>
      <BestAnecdote anecdote={anecdotes[i]} votes={copy[i]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
